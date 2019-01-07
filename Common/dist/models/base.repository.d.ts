import 'reflect-metadata';
import * as Knex from 'knex';
import { QueryInterface, Transaction } from 'knex';
import { PaginatedResponse } from '../interfaces';
import { PaginationDto } from '../dto';
export declare abstract class BaseRepository<T> {
    private readonly db;
    private readonly _table;
    private readonly MappingType;
    protected constructor(db: Knex, tableName: string, MappingType: {
        new (...args: any[]): T;
    });
    private readonly table;
    find(query: object, columns?: string[]): Promise<T[]>;
    findOne(query: object, columns?: string[]): Promise<T | undefined>;
    save(entity: Partial<T>): Promise<T>;
    update(query: object, entity: Partial<T>): Promise<T | undefined>;
    delete(query: object): Promise<void>;
    getOneQueryResult(query: QueryInterface): Promise<T | undefined>;
    getManyQueryResults(query: QueryInterface): Promise<T[]>;
    queryBuilder(): QueryInterface;
    transaction(callback: (ctx: Transaction) => void): any;
    findManyWithPagination(query: object, { page, limit }: Required<PaginationDto>, columns?: string[]): Promise<PaginatedResponse<T>>;
}
