import { User } from './user.interface';
import { UserModel } from './user.model';
import {inject, injectable} from 'inversify';
import { CreateUserDto } from './dto/create-user.dto';
import {PasswordsService} from '../core/services/passwords.service';

@injectable()
export class UsersService {

    @inject(PasswordsService)
    private readonly passwordsService: PasswordsService;

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
}