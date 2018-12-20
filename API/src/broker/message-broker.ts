import {QueuesEnum} from './queues.enum';
import { Message } from './message';
import {injectable} from 'inversify';

@injectable()
export class MessageBroker {
    connection: any;

    constructor() {
        console.log('Broker created');
    }

    async sendMessage(queue: QueuesEnum, message: Message): Promise<void> {
        await this.connection.assertQueue(queue);
        this.connection.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    }

    private handleError(err) {
        console.log('[AMQP] Connection error: ', err);
    }

    private handleClose(err) {
        console.log('[AMQP] Connection closed: ', err);
    }

    run(connection: any) {
        this.connection = connection;
        this.connection.on('error', this.handleError.bind(this));
        this.connection.on('close', this.handleClose.bind(this));
        console.log('[AMQP] Connection established');
    }
}