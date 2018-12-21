import {injectable} from 'inversify';
import {Message} from '../../broker/message';
import {QueuesEnum} from '../../broker/queues.enum';
import {messageBroker} from '../../broker/message-broker';

@injectable()
export class BrokerService {

    async sendMessage(queue: QueuesEnum, message: Message): Promise<void> {
        console.log(messageBroker.connection);
        // await messageBroker.connection.assertQueue(queue);
        messageBroker.connection.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    }
}