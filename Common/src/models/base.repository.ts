import 'reflect-metadata';
import * as Knex from 'knex';
import { toNumber } from 'lodash';
import {QueryInterface, Transaction} from 'knex';
import {injectable, unmanaged} from 'inversify';
import {PaginatedResponse} from '../interfaces';
import {PaginationDto} from '../dto';

@injectable()
export abstract class BaseRepository<T> {
    private readonly db: Knex;
    private readonly _table: QueryInterface;
    private readonly MappingType: { new(...args): T };

    protected constructor(
        @unmanaged() db: Knex,
        @unmanaged() tableName: string,
        @unmanaged() MappingType: { new(...args): T }
     ) {
        this.db = db;
        this._table = db(tableName);
        this.MappingType = MappingType;
    }

    private get table() {
        return this._table.clone();
    }

    public async find(query: object, columns?: string[]): Promise<T[]> {
        let sql: QueryInterface;

        if(columns) {
            sql = this.table.select(...columns);
        } else {
            sql = this.table.select('*');
        }

        const data = await sql.where(query);
        return data.map(item => Reflect.construct(this.MappingType, [item]));
    }

    public async findOne(query: object, columns?: string[]): Promise<T | undefined> {
        let sql: QueryInterface;

        if(columns) {
            sql = this.table.select(...columns);
        } else {
            sql = this.table.select('*')
        }

        const data = await sql.where(query);


        if(data[0]) {
            return Reflect.construct(this.MappingType, [data[0]]);
        }
    }

    public async save(entity: Partial<T>): Promise<T> {
        if(!(entity instanceof this.MappingType)) {
            throw new Error('Entity should be an instance of model');
        }

        const rawData = await this.table
            .insert(entity)
            .returning('*');

        return Reflect.construct(this.MappingType, [rawData[0]]);
    }

    public async update(query: object, entity: Partial<T>): Promise<T | undefined> {

        const rawData = await this.table
            .update(entity)
            .where(query)
            .returning('*');

        if(rawData[0]) {
            return Reflect.construct(this.MappingType, [rawData[0]]);
        }
    }

    public async delete(query: object): Promise<void> {
        await this.table
            .delete('')
            .where(query);
    }

    public async getOneQueryResult(query: QueryInterface): Promise<T | undefined> {
        const result = await query.returning('*');

        if(result[0]) {
            return Reflect.construct(this.MappingType, [result[0]]);
        }
    }

    public async getManyQueryResults(query: QueryInterface): Promise<T[]> {
        const result = await query.returning('*');

        return result.map(item => Reflect.construct(this.MappingType, [item]));
    }

    public queryBuilder(): QueryInterface {
        return this.table;
    }

    public transaction(callback: (ctx: Transaction) => void): any {
        return this.db.transaction(callback);
    }

    public async findManyWithPagination(query: object,  { page, limit }: Required<PaginationDto>, columns?: string[]): Promise<PaginatedResponse<T>> {
        let sql: QueryInterface;

        if(columns) {
            sql = this.table.select(...columns);
        } else {
            sql = this.table.select('*');
        }

        sql = sql.where(query).offset((page - 1) * limit).limit(limit);

        const rawData = await sql.clone();
        const totalCount = await this.table.count('id').where(query);

        return {
            page,
            data: rawData.map(item => Reflect.construct(this.MappingType, [item])),
            itemsPerPage: limit,
            totalCount: toNumber(totalCount[0].count)
        }
    }
}