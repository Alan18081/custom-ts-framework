import { Project, User } from '@astra/common';
export declare class StoragesController {
    findAll(query: any): Promise<Project[]>;
    findManyByUser(user: User): Promise<Project[]>;
    findOne(id: number, user: User): Promise<Project>;
    createOne(user: User, body: any): Promise<Project>;
    updateOne(id: number, user: User, body: any): Promise<Project | undefined>;
    removeOne(id: number): Promise<void>;
}
