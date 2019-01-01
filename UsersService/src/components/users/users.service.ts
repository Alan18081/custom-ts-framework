import { User } from './user';
import {inject, injectable} from 'inversify';
import { CreateUserDto } from './dto/create-user.dto';
import {HashService} from '@astra/common';
import {FindUsersListDto} from './dto/find-users-list.dto';
import {UsersRepository} from './users.repository';

@injectable()
export class UsersService {

    @inject(HashService)
    private readonly hashService: HashService;

    @inject(UsersRepository)
    private readonly usersRepository: UsersRepository;

    async findMany(query: FindUsersListDto): Promise<User[]> {
        return await this.usersRepository.find(query);
    }

    async findOneById(id: number): Promise<User | undefined> {
        return await this.usersRepository.findOne({ id });
    }

    async findOneByEmail(email: string): Promise<User | undefined> {
        return await this.usersRepository.findOne({ email });
    }

    async createOne(userData: CreateUserDto): Promise<User> {
      const newUser = new User(userData);
      newUser.password = await this.hashService.generateHash(userData.password);
      console.log('Creating user');
      return await this.usersRepository.save(newUser);
    }

    async updateOne(id: number, data: Partial<User>) {
      return await this.usersRepository.update({ id }, { ...data });
    }

    async removeOne(id: number): Promise<void> {
        await this.usersRepository.delete({ id });
    }
}