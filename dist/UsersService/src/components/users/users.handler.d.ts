import { User } from '@astra/common';
import { FindUsersListDto } from './dto/find-users-list.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { FindUserByEmailDto } from './dto/find-user-by-email.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RemoveUserDto } from './dto/remove-user.dto';
export declare class UsersHandler {
    private readonly usersService;
    private readonly validatorService;
    findMany(query: FindUsersListDto): Promise<User[]>;
    findOne(query: FindUserDto): Promise<User | undefined>;
    findOneByEmail(query: FindUserByEmailDto): Promise<User | undefined>;
    createOne(payload: CreateUserDto): Promise<User>;
    updateOne(payload: UpdateUserDto): Promise<User | undefined>;
    removeOne(payload: RemoveUserDto): Promise<void>;
}
