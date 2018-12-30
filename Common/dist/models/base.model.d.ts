import { QueryBuilder } from 'knex';
import Knex = require('knex');
declare type GenericModel<T> = {
    new (...args: any[]): T;
    tableName: string;
    db: Knex;
};
export declare class BaseModel {
    static db: Knex;
    constructor(...args: any[]);
    static createQueryBuilder(): QueryBuilder;
    static find<T>(this: GenericModel<T>, query: object, columns?: string[]): Promise<T[]>;
    static findOne<T extends BaseModel>(this: GenericModel<T>, query: object, columns?: string[]): Promise<T | undefined>;
    static save<T>(this: GenericModel<T>, entity: BaseModel): Promise<T>;
    static update<T>(this: GenericModel<T>, query: object, entity: Partial<T>): Promise<T | undefined>;
    static delete<T>(this: GenericModel<T>, query: object): Promise<void>;
}
export {};
