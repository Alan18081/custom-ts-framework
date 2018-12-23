import {inject, injectable} from 'inversify';
import { messageBroker } from '../../lib/broker/message-broker';
import { QueuesEnum } from '../../../../Common/queues.enum';
import { Message } from '../../../../Common/broker/message';
import {CommunicationCodes} from '../../../../Common/communication-codes';
import { CreateUserDto } from './dto/create-user.dto';

@injectable()
export class UsersService {

    async createUser(body: CreateUserDto) {

    }

}