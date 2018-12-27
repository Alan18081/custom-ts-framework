import { User } from '@astra/common';
export declare class UsersController {
    findMany(query: any): Promise<User[]>;
    findOne(id: number): Promise<User | undefined>;
    createOne(body: any): Promise<User>;
    updateOne(id: number, body: any): Promise<User | undefined>;
    removeOne(id: number): Promise<void>;
}
