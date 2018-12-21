import {injectable} from 'inversify';
import {Message} from '../../broker/message';
import {QueuesEnum} from '../../broker/queues.enum';
import {messageBroker} from '../../broker/message-broker';

@injectable()
export class BrokerService {

    async sendMessage(queue: QueuesEnum, message: Message): Promise<void> {
        await messageBroker.channel.assertQueue(queue);
        messageBroker.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    }
}