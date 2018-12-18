import { Injectable } from '../../lib/server/injector';
import {AuthService} from '../auth/auth.service';
import {InjectRepository} from '../../lib/models/injector';
import {User} from '../../lib/models/user.entity';
import {Repository} from '../../lib/models/repository';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: AuthService
  ) {}

  async findAll() {
    return await this.userRepository.find({}, { relations: ['profile'] });
  }

  async createOne(userData: Partial<User>): Promise<User> {
    const user = new User();
    user.name = userData.name;
    user.age = userData.age;
    return await this.userRepository.save(user);
  }

  async updateOne(id: number, userData: Partial<User>): Promise<User | undefined> {
    return await this.userRepository.update({ id }, userData);
  }
}