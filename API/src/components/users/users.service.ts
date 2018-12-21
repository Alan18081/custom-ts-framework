import {inject, injectable} from 'inversify';
import {BrokerService} from '../broker/broker.service';
import { QueuesEnum } from '../../../../Common/broker/queues.enum';
import { Message } from '../../broker/message';

@injectable()
export class UsersService {

    @inject(BrokerService) messageBroker: BrokerService;

    async createUser() {
        // await this.messageBroker.sendMessage(QueuesEnum.USERS_SERVICE, new Message('456', 'Hi' ));
    }

}