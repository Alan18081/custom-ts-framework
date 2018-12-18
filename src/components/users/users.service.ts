import { Injectable } from '../../common/server/injector';
import {AuthService} from '../auth/auth.service';
import { User } from './user.interface';
import { UserModel } from './user.model';

@Injectable()
export class UsersService {

  constructor(
    private readonly authService: AuthService
  ) {}

  async createOne(userData: User): Promise<User> {
    const user = new UserModel({
      ...userData
    });

    return await UserModel.save(user);
  }
}