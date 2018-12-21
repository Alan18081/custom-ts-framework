import {inject, injectable} from 'inversify';
import {BrokerService} from '../broker/broker.service';
import { QueuesEnum } from '../../../../Common/broker/queues.enum';
import {Message} from '../../broker/message';

@injectable()
export class UsersService {

    @inject(BrokerService) messageBroker: BrokerService;

    async createUser() {
        const msg = new Message('456', { name: 'Alan' });
        await this.messageBroker.sendMessage(QueuesEnum.USERS_SERVICE, msg);
        console.log('Hello from create user');
    }

}