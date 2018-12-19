import {QueuesEnum} from './queues.enum';
import { Message } from './message';

export class MessageBroker {
    private readonly connection: any;

    constructor(connection: any) {
        this.connection = connection;
    }

    async sendMessage(queue: QueuesEnum, message: Message): Promise<void> {
        await this.connection.assertQueue(queue);
        this.connection.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    }
}