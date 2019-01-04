import { CommunicationCodes, Messages, BadRequest, SubscribeMessage, ValidatorService } from '@astra/common';
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

  @inject(ValidatorService)
  private readonly validatorService: ValidatorService;

  @SubscribeMessage(CommunicationCodes.GET_USERS_LIST)
  async findMany(query: FindUsersListDto): Promise<User[]> {
    await this.validatorService.validate(query, FindUsersListDto);

    return await this.usersService.findMany(query);
  }

  @SubscribeMessage(CommunicationCodes.GET_USER)
  async findOne(query: FindUserDto): Promise<User | undefined> {
      await this.validatorService.validate(query, FindUserDto);

      return await this.usersService.findOneById(query.id);
  }

  @SubscribeMessage(CommunicationCodes.GET_USER_BY_EMAIL)
  async findOneByEmail(query: FindUserByEmailDto): Promise<User | undefined> {
    await this.validatorService.validate(query, FindUserByEmailDto);

    console.log(query.email);

    return await this.usersService.findOneByEmail(query.email);
  }

  @SubscribeMessage(CommunicationCodes.CREATE_USER)
  async createOne(payload: CreateUserDto): Promise<User> {
      await this.validatorService.validate(payload, CreateUserDto);

      const user = await this.usersService.findOneByEmail(payload.email);
      if(user) {
          throw new BadRequest({ error: Messages.USER_ALREADY_EXISTS });
      }

      return await this.usersService.createOne(payload);
  }

  @SubscribeMessage(CommunicationCodes.UPDATE_USER)
  async updateOne(payload: UpdateUserDto): Promise<User | undefined> {
      await this.validatorService.validate(payload, UpdateUserDto);

      const { id, ...data } = payload;

      return await this.usersService.updateOne(id, data);
  }

  @SubscribeMessage(CommunicationCodes.REMOVE_USER)
  async removeOne(payload: RemoveUserDto): Promise<void> {
      await this.validatorService.validate(payload, RemoveUserDto);
      await this.usersService.removeOne(payload.id);
  }
}