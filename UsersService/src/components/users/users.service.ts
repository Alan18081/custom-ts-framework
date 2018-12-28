import { User } from '@astra/common';
import { UserModel } from './user.model';
import {inject, injectable} from 'inversify';
import { CreateUserDto } from './dto/create-user.dto';
import {PasswordsService} from '../core/services/passwords.service';
import {FindUsersListDto} from './dto/find-users-list.dto';

@injectable()
export class UsersService {

    @inject(PasswordsService)
    private readonly passwordsService: PasswordsService;

    async findMany(query: FindUsersListDto): Promise<UserModel[]> {
        return await UserModel.find(query);
    }

    async findOneById(id: number): Promise<UserModel | undefined> {
        return await UserModel.findOne({ id });
    }

    async findOneByEmail(email: string): Promise<UserModel | undefined> {
        return await UserModel.findOne({ email });
    }

    async createOne(userData: CreateUserDto): Promise<UserModel> {
      const newUser = new UserModel(userData);
      newUser.password = await this.passwordsService.encryptPassword(userData.password);
      return await UserModel.save(newUser);
    }

    async updateOne(id: number, data: Partial<User>) {
      return await UserModel.update({ id }, { ...data });
    }

    async removeOne(id: number): Promise<void> {
        await UserModel.delete({ id });
    }
}