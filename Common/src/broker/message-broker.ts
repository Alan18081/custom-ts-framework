import {Channel, Connection, ConsumeMessage, Options} from 'amqplib';
import * as uid from 'uid';
import { eventEmitter } from '../common';
import { CommunicationCodes, QueuesEnum } from '../enums';
import { Message } from './message';
import { METADATA_KEY } from '../metadata/keys';
import { ResolvedSubscriber } from './metadata';

export class MessageBroker {
  private connection: Connection;
  public channel: Channel;

  constructor(
    private readonly queue: QueuesEnum,
    private readonly rpcQueue: QueuesEnum,
  ) {}

  private bufferMessage(message: Message): Buffer {
    console.log('Message to buffer', message);
    return Buffer.from(JSON.stringify(message));
  }

  private parseMessage(buffer: Buffer): Message {
    return JSON.parse(buffer.toString());
  }

  private handleError(err): void {
    console.log('[AMQP] Connection error: ', err);
  }

  private handleClose(err): void {
    console.log('[AMQP] Connection closed: ', err);
  }

  async sendMessage(queue: QueuesEnum, code: CommunicationCodes, payload: any, config: Options.Publish = {}): Promise<void> {
    await this.channel.assertQueue(queue);
    const message = new Message(code, payload);
    console.log(`[Sending Message] ${queue} : ${code}`, payload);
    this.channel.sendToQueue(queue, this.bufferMessage(message), config);
  }

  async sendMessageAndGetResponse(queue: QueuesEnum, code: CommunicationCodes, payload: any): Promise<Message> {
    await this.channel.assertQueue(queue);
    const id = uid();
    await this.sendMessage(queue, code, payload, { correlationId: id, replyTo: this.rpcQueue, contentType: 'application/json' })
    return await this.subscribe(id);
  }

  async run(connection: any): Promise<void> {
    this.connection = connection;
    this.channel = await this.connection.createChannel();
    this.connection.on('error', this.handleError.bind(this));
    this.connection.on('close', this.handleClose.bind(this));
    await this.init();
    console.log('[AMQP] Connection established');
  }

  subscribe(id: string): Promise<Message> {
    return new Promise<Message>((resolve) => {
      eventEmitter.once(id, message => {
        resolve(message);
      });
    });
  }

  private async init(): Promise<void> {
    const subscribers = Reflect.getMetadata(METADATA_KEY.resolvedSubscribers, Reflect) || {};
    await this.channel.assertQueue(this.queue);

    await this.channel.assertQueue(this.rpcQueue);
    this.channel.consume(this.rpcQueue, msg => {
      if(msg) {
        console.log('New RPC message', this.parseMessage(msg.content));
        try {
          eventEmitter.emit(msg.properties.correlationId, this.parseMessage(msg.content));
        } catch (e) {
          console.log(e);
        }
      }
      this.channel.ack(msg);
    });

    this.channel.consume(this.queue, (msg: ConsumeMessage | null) => {
      if(msg) {
        try {
          const message: Message = JSON.parse(msg.content.toString());
          const { code } = message;
          const subscriber: ResolvedSubscriber | undefined = subscribers[code];
          if(subscriber) {
            const result: Promise<Message> | Message = subscriber.handler.call(subscriber.instance, message.payload, subscriber.withResponse ? this.sendMessage : null);
            if(result instanceof Promise) {
              result
                .then(res => this.sendMessage(msg.properties.replyTo, message.code, res, { correlationId: msg.properties.correlationId }))
                .catch(err => this.sendMessage(msg.properties.replyTo, message.code, err, { correlationId: msg.properties.correlationId }));
            } else {
              this.sendMessage(msg.properties.replyTo, message.code, message.payload, { correlationId: msg.properties.correlationId })
            }
          }
        } catch (e) {
          console.log('[AMQP] Failed to parse message', e);
        }
        this.channel.ack(msg);
      }
    });
  }
};
