import { CommunicationCodes, Messages, BadRequest } from '@astra/common';
import { UsersService } from './users.service';
import {User} from "./user.interface";
import {inject, injectable} from 'inversify';
import {UsersFilter} from './users.filter';
import {FindUsersListDto} from './dto/find-users-list.dto';
import { CreateUserDto } from './dto/create-user.dto';
import {FindUserDto} from './dto/find-user.dto';
import { FindUserByEmail } from './dto/find-user-by-email';

@injectable()
export class UsersHandler {
  @inject(UsersService)
  private readonly usersService: UsersService;

  @inject(UsersFilter)
  private readonly usersFilter: UsersFilter;

  @SubscribeMessage(CommunicationCodes.GET_USERS_LIST)
  async findMany(query: FindUsersListDto): Promise<User[]> {
    await this.usersFilter.findMany(query);
    return await this.usersService.findMany(query);
  }

  @SubscribeMessage(CommunicationCodes.GET_USER)
  async findOne(query: FindUserDto): Promise<User | undefined> {
      await this.usersFilter.findOne(query);
      return await this.usersService.findOneById(query.id);
  }

  @SubscribeMessage(CommunicationCodes.GET_USER_BY_EMAIL)
  async findOneByEmail(query: FindUserByEmail): Promise<User | undefined> {
    await this.usersFilter.findOneByEmail(query);
    return await this.usersService.findOneByEmail(query.email);
  }

  @SubscribeMessage(CommunicationCodes.CREATE_USER)
  async createOne(payload: CreateUserDto): Promise<User> {
      await this.usersFilter.createUser(payload);
      const user = await this.usersService.findOneByEmail(payload.email);
      if(user) {
          throw new BadRequest({ error: Messages.USER_ALREADY_EXISTS });
      }

      return await this.usersService.createOne(payload);
  }

  async updateOne(): Promise<User | undefined> {
      return null;
  }
}