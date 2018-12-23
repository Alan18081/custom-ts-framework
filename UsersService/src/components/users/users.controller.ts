import { UsersService } from './users.service';
import {User} from "./user.interface";
import {SubscribeMessage} from '../../lib/broker/decorators';
import {CommunicationCodes} from '../../../../Common/communication-codes';
import {inject, injectable} from 'inversify';
import { CreateUserDto } from './dto/create-user.dto';
import {BrokerException} from '../../../../Common/broker-exception';
import {CommunicationErrors} from '../../../../Common/communication-errors';

@injectable()
export class UsersController {
  @inject(UsersService)
  private readonly usersService: UsersService;

  @SubscribeMessage(CommunicationCodes.CREATE_USER)
  async createOne(payload: CreateUserDto): Promise<User> {
      const user = await this.usersService.findOneByEmail(payload.email);
      if(user) {
          console.log('User already exists');
          throw new BrokerException(CommunicationErrors.USER_ALREADY_EXISTS);
      }
      console.log('Payload', payload);
      const resUser = await this.usersService.createOne(payload);
      console.log('Create user', resUser);
      return resUser;
  }

  async updateOne(): Promise<User | undefined> {
      return null;
  }
}