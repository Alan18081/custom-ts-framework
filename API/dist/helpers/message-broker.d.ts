import { Channel, Options } from 'amqplib';
import { QueuesEnum, Message } from '@astra/common';
declare class MessageBroker {
    private connection;
    channel: Channel;
    private readonly queue;
    private bufferMessage;
    private parseMessage;
    private handleError;
    private handleClose;
    sendMessage(queue: QueuesEnum, message: Message, config?: Options.Publish): Promise<void>;
    sendMessageAndGetResponse(queue: QueuesEnum, message: Message): Promise<Message>;
    run(connection: any): Promise<void>;
    subscribe(id: string): Promise<Message>;
    private init;
}
export declare const messageBroker: MessageBroker;
export {};
