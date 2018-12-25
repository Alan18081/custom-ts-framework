import {Channel, Connection, ConsumeMessage, Options} from 'amqplib';
import {QueuesEnum, Message, ResolvedSubscriber, eventEmitter, METADATA_KEY} from '@astra/common';
import * as uid from 'uid';

class MessageBroker {
    private connection: Connection;
    public channel: Channel;
    private readonly queue = QueuesEnum.API;

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

    async sendMessage(queue: QueuesEnum, message: Message, config: Options.Publish = {}): Promise<void> {
        await this.channel.assertQueue(queue);
        this.channel.sendToQueue(queue, this.bufferMessage(message), config);
    }

    async sendMessageAndGetResponse(queue: QueuesEnum, message: Message): Promise<Message> {
          await this.channel.assertQueue(queue);
          const id = uid();
          await this.sendMessage(queue, message, { correlationId: id, replyTo: QueuesEnum.RPC_API, contentType: 'application/json' })
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
               resolve(message)
            });
        });
    }

    private async init(): Promise<void> {
        const subscribers = Reflect.getMetadata(METADATA_KEY.subscribers, Reflect) || {};
        await this.channel.assertQueue(this.queue);

        await this.channel.assertQueue(QueuesEnum.RPC_API);
        this.channel.consume(QueuesEnum.RPC_API, msg => {
            if(msg) {
                try {
                    eventEmitter.emit(msg.properties.correlationId, this.parseMessage(msg.content));
                } catch (e) {

                }
            }
        });

        this.channel.consume(this.queue, (msg: ConsumeMessage | null) => {
            if(msg) {
                try {
                    const message: Message = JSON.parse(msg.content.toString());
                    const { code } = message;
                    const subscriber: ResolvedSubscriber | undefined = subscribers[code];
                    console.log('[AMQP] New message', message);
                    if(subscriber) {
                        const result: Promise<Message> | Message = subscriber.handler.call(subscriber.instance, message.payload, subscriber.withResponse ? this.sendMessage : null);
                        if(result instanceof Promise) {
                            result
                                .then(res => this.sendMessage(msg.properties.replyTo, res, { correlationId: msg.properties.correlationId }))
                                .catch(err => this.sendMessage(msg.properties.replyTo, err, { correlationId: msg.properties.correlationId }));
                        } else {
                            this.sendMessage(msg.properties.replyTo, result, { correlationId: msg.properties.correlationId })
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

export const messageBroker = new MessageBroker();
