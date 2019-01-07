import {CommunicationCodes, Messages, BadRequest, SubscribeMessage, ValidatorService, Validate} from '@astra/common';
import { UsersService } from './users.service';
import {inject, injectable} from 'inversify';
import {FindUsersListDto} from './dto/find-users-list.dto';
import { CreateUserDto } from './dto/create-user.dto';
import {FindUserDto} from './dto/find-user.dto';
import { FindUserByEmailDto } from './dto/find-user-by-email.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {RemoveUserDto} from './dto/remove-user.dto';
import {User} from './user';

@injectable()
export class UsersHandler {
  @inject(UsersService)
  private readonly usersService: UsersService;

  @SubscribeMessage(CommunicationCodes.GET_USERS_LIST)
  @Validate(FindUsersListDto)
  async findMany(query: FindUsersListDto): Promise<User[]> {

    return await this.usersService.findMany(query);
  }

  @SubscribeMessage(CommunicationCodes.GET_USER)
  @Validate(FindUserDto)
  async findOne(query: FindUserDto): Promise<User | undefined> {

      return await this.usersService.findOneById(query.id);
  }

  @SubscribeMessage(CommunicationCodes.GET_USER_BY_EMAIL)
  @Validate(FindUserByEmailDto)
  async findOneByEmail(query: FindUserByEmailDto): Promise<User | undefined> {
    return await this.usersService.findOneByEmail(query.email);
  }

  @SubscribeMessage(CommunicationCodes.CREATE_USER)
  @Validate(CreateUserDto)
  async createOne(payload: CreateUserDto): Promise<User> {
      const user = await this.usersService.findOneByEmail(payload.email);
      if(user) {
          throw new BadRequest({ error: Messages.USER_ALREADY_EXISTS });
      }

      return await this.usersService.createOne(payload);
  }

  @SubscribeMessage(CommunicationCodes.UPDATE_USER)
  @Validate(UpdateUserDto)
  async updateOne(payload: UpdateUserDto): Promise<User | undefined> {
      const { id, ...data } = payload;

      return await this.usersService.updateOne(id, data);
  }

  @SubscribeMessage(CommunicationCodes.REMOVE_USER)
  @Validate(RemoveUserDto)
  async removeOne(payload: RemoveUserDto): Promise<void> {
      await this.usersService.removeOne(payload.id);
  }
}