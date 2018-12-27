import { User } from '@astra/common';
import { UserModel } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUsersListDto } from './dto/find-users-list.dto';
export declare class UsersService {
    private readonly passwordsService;
    findMany(query: FindUsersListDto): Promise<User[]>;
    findOneById(id: number): Promise<User | undefined>;
    findOneByEmail(email: string): Promise<User | undefined>;
    createOne(userData: CreateUserDto): Promise<User>;
    updateOne(id: number, data: Partial<User>): Promise<UserModel>;
    removeOne(id: number): Promise<void>;
}
