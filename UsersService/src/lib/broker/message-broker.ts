import {Channel, Connection, ConsumeMessage, Options} from 'amqplib';
import { Message } from '../../../../Common/src/broker/message';
import {QueuesEnum} from '../../../../Common/src/common/queues.enum';
import {METADATA_KEY} from '../../../../Common/src/metadata/keys';
import {ResolvedSubscriber} from './metadata';
import * as uid from 'uid';
import {ErrorMessage} from '../../../../Common/src/broker/error-message';
import { HttpError } from '../../../../Common/src/server/http-errors';

export const messageBroker = new class {
    private connection: Connection;
    public channel: Channel;
    private readonly queue = QueuesEnum.USERS_SERVICE;

    private handleError(err): void {
        console.log('[AMQP] Connection error: ', err);
    }

    private handleClose(err): void {
        console.log('[AMQP] Connection closed: ', err);
    }

    async sendMessage(queue: QueuesEnum, message: Message | ErrorMessage, config: Options.Publish = {}): Promise<void> {
        await this.channel.assertQueue(queue);
        this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), config);
    }

    async sendMessageAndGetResponse(queue: QueuesEnum, message: Message): Promise<void> {
        await this.channel.assertQueue(queue);
        const id = uid();
        await this.sendMessage(queue, message, { correlationId: id, replyTo: QueuesEnum.RPC_API })
    }

    async run(connection: any): Promise<void> {
        this.connection = connection;
        this.channel = await this.connection.createChannel();
        this.connection.on('error', this.handleError.bind(this));
        this.connection.on('close', this.handleClose.bind(this));
        await this.init();
        console.log('[AMQP] Connection established');
    }

    private async init(): Promise<void> {
        const subscribers = Reflect.getMetadata(METADATA_KEY.resolvedSubscribers, Reflect) || {};
        await this.channel.assertQueue(this.queue);
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
                                .catch((err: HttpError) => {
                                    const errorMessage = new ErrorMessage(code, err.message);
                                    errorMessage.statusCode = err.statusCode;
                                    return this.sendMessage(msg.properties.replyTo, errorMessage, { correlationId: msg.properties.correlationId })
                                });
                        } else {
                            this.sendMessage(msg.properties.replyTo, result, { correlationId: msg.properties.correlationId })
                        }
                    }
                } catch (e) {
                    console.log('[AMQP] Failed to parse message', e);
                }
            }
            this.channel.ack(msg);
        });
    }
};
