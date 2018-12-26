import { QueryBuilder } from 'knex';
declare type GenericModel<T> = {
    new (...args: any[]): T;
    tableName: string;
};
export declare class BaseModel<T> {
    constructor(...args: any[]);
    static createQueryBuilder(): QueryBuilder;
    static findOne<T>(this: GenericModel<T>, query: object, columns?: string[]): Promise<T | undefined>;
    static getOne<T>(this: GenericModel<T>, query: QueryBuilder): Promise<T | undefined>;
    static getMany<T>(this: GenericModel<T>, query: QueryBuilder): Promise<T[]>;
    static save<T>(this: GenericModel<T>, entity: T): Promise<T>;
    static update<T>(this: GenericModel<T>, query: object, entity: Partial<T>): Promise<T>;
    static delete<T>(this: GenericModel<T>, query: object): Promise<void>;
}
export {};
