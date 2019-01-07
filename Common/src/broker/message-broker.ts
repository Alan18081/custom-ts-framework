import {Channel, Connection, ConsumeMessage, Options} from 'amqplib';
import { validate } from 'class-validator';
import * as uid from 'uid';
import { eventEmitter } from '../common';
import { CommunicationCodes, QueuesEnum } from '../enums';
import { Message } from './message';
import { METADATA_KEY } from '../metadata/keys';
import { ResolvedSubscriber } from './interfaces';
import {ValidationError} from '../interfaces';
import {BadRequest} from '../server';

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

  async sendErrorMessage(queue: QueuesEnum, code: CommunicationCodes, payload: any, config: Options.Publish = {}): Promise<void> {
      await this.channel.assertQueue(queue);
      const message = new Message(code, payload, true);
      console.log(`[Sending Error Message] ${queue} : ${code}`, payload);
      this.channel.sendToQueue(queue, this.bufferMessage(message), config);
  }

  async sendMessageAndGetResponse(queue: QueuesEnum, code: CommunicationCodes, payload: any): Promise<Message> {
    await this.channel.assertQueue(queue);
    const id = uid();
    await this.sendMessage(queue, code, payload, { correlationId: id, replyTo: this.rpcQueue, contentType: 'application/json' })
    const message =  await this.subscribe(id);
    if(message.error) {
       throw message.payload;
    }
    return message;
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
    return new Promise<Message>((resolve, reject) => {
      eventEmitter.once(id, (message: Message) => {
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
        this.channel.ack(msg);
        eventEmitter.emit(msg.properties.correlationId, this.parseMessage(msg.content));
      }
    });

    this.channel.consume(this.queue, async (msg: ConsumeMessage | null) => {
      if(msg) {
        try {
          this.channel.ack(msg);
          const message: Message = JSON.parse(msg.content.toString());
          const { code } = message;
          const subscriber: ResolvedSubscriber | undefined = subscribers[code];
          if(subscriber) {
            if(subscriber.Validator) {
              try {
                await this.validate(message.payload, subscriber.Validator);
              } catch (e) {
                console.log('Validation error', e);
                await this.sendErrorMessage(msg.properties.replyTo, message.code, e, { correlationId: msg.properties.correlationId });
                return false;
              }
            }
            if(subscriber.cacheInterceptor) {
              const data = await subscriber.cacheInterceptor.get(JSON.stringify(message.payload));
              if(data) {
                return await this.sendMessage(msg.properties.replyTo, message.code, data, { correlationId: msg.properties.correlationId });
              }
            }
            const result: Promise<Message> | Message = subscriber.handler.call(subscriber.instance, message.payload, subscriber.withResponse ? this.sendMessage : null);
            if(result instanceof Promise) {
              try {
                  const res = await result;
                  await Promise.all([
                      this.sendMessage(msg.properties.replyTo, message.code, res, { correlationId: msg.properties.correlationId }),
                      subscriber.cacheInterceptor ? subscriber.cacheInterceptor.save(JSON.stringify(message.payload), res) : null
                  ]);
              } catch(e) {
                 await  this.sendErrorMessage(msg.properties.replyTo, message.code, e, { correlationId: msg.properties.correlationId })
              }

            } else {
              await this.sendMessage(msg.properties.replyTo, message.code, message.payload, { correlationId: msg.properties.correlationId })
            }
          }
        } catch (e) {
          console.log('[AMQP] Failed to process message', e);
        }
      }
    });
  }

  private async validate(body: any = {}, DtoType: { new(...args) }): Promise<void> {
      const data = new DtoType(body);
      const errors = await validate(data);
      if(errors.length) {
          const errorMessages = errors.map(({ property, constraints }): ValidationError => ({
              property,
              constraints: Object.keys(constraints).map(key => constraints[key])
          }));

          throw new BadRequest({ errors: errorMessages });
      }
  }
};
