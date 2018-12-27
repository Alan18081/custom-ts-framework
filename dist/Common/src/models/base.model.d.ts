import { QueryBuilder } from 'knex';
declare type GenericModel<T> = {
    new (...args: any[]): T;
    tableName: string;
};
export declare class BaseModel<T> {
    constructor(...args: any[]);
    static createQueryBuilder(): QueryBuilder;
    static find<T>(this: GenericModel<T>, query: object, columns?: string[]): Promise<T[]>;
    static findOne<T>(this: GenericModel<T>, query: object, columns?: string[]): Promise<T | undefined>;
    static save<T>(this: GenericModel<T>, entity: GenericModel<T>): Promise<T>;
    static update<T>(this: GenericModel<T>, query: object, entity: Partial<T>): Promise<T>;
    static delete<T>(this: GenericModel<T>, query: object): Promise<void>;
}
export {};
