import { QueryBuilder } from 'knex';
declare type GenericModel<T> = {
    new (...args: any[]): T;
    tableName: string;
};
export declare class BaseModel {
    constructor(...args: any[]);
    static createQueryBuilder(): QueryBuilder;
    static find<T>(this: GenericModel<T>, query: object, columns?: string[]): Promise<T[]>;
    static findOne<T extends BaseModel>(this: GenericModel<T>, query: object, columns?: string[]): Promise<T | undefined>;
    static save<T>(this: GenericModel<T>, entity: BaseModel): Promise<T>;
    static update<T>(this: GenericModel<T>, query: object, entity: Partial<T>): Promise<T | undefined>;
    static delete<T>(this: GenericModel<T>, query: object): Promise<void>;
}
export {};
