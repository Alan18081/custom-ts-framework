import { Channel, Options } from 'amqplib';
import { CommunicationCodes, QueuesEnum } from '../common';
import { Message } from './message';
export declare class MessageBroker {
    private readonly queue;
    private readonly rpcQueue;
    private connection;
    channel: Channel;
    constructor(queue: QueuesEnum, rpcQueue: QueuesEnum);
    private bufferMessage;
    private parseMessage;
    private handleError;
    private handleClose;
    sendMessage(queue: QueuesEnum, code: CommunicationCodes, payload: any, config?: Options.Publish): Promise<void>;
    sendMessageAndGetResponse(queue: QueuesEnum, code: CommunicationCodes, payload: any): Promise<Message>;
    run(connection: any): Promise<void>;
    subscribe(id: string): Promise<Message>;
    private init;
}
