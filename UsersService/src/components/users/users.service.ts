import { User } from './user.interface';
import { UserModel } from './user.model';
import {inject, injectable} from 'inversify';
import { CreateUserDto } from './dto/create-user.dto';
import {PasswordsService} from '../core/services/passwords.service';
import {FindUsersListDto} from './dto/find-users-list.dto';

@injectable()
export class UsersService {

    @inject(PasswordsService)
    private readonly passwordsService: PasswordsService;

    async findMany(query: FindUsersListDto): Promise<User[]> {
        const sql = UserModel.createQueryBuilder()
            .select('*')
            .from(UserModel.tableName)
            .where(query);

        return await UserModel.getMany(sql);
    }

    async findOneById(id: number): Promise<User | undefined> {
        const sql = UserModel.createQueryBuilder()
            .select('*')
            .from(UserModel.tableName)
            .where({ id });

        return await UserModel.getOne(sql);
    }

    async findOneByEmail(email: string): Promise<User | undefined> {
        const query = UserModel.createQueryBuilder()
            .select('*')
            .from(UserModel.tableName)
            .where({ email });

        return await UserModel.getOne(query);
    }

    async createOne(userData: CreateUserDto): Promise<User> {
      const newUser = new UserModel(userData);
      newUser.password = await this.passwordsService.encryptPassword(userData.password);
      return await UserModel.save(newUser);
    }

    async deleteOne(id: number): Promise<void> {
        await UserModel.delete({ id });
    }
}