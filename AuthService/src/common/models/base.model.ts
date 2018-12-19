import { db } from './knex';
import * as pg from 'pg-promise';
import { QueryBuilder } from 'knex';

const raw = pg()({});

type GenericModel<T> = {
  new (...args: any[]): T;
  tableName: string;
}

export class BaseModel<T> {
  
  constructor(...args: any[]) {
    return new Proxy(this, this);
  };

  public static createQueryBuilder(): QueryBuilder {
    return db.queryBuilder();
  }

  public static async getOne<T>(this: GenericModel<T>, query: QueryBuilder): Promise<T | undefined> {
    const data = await raw.oneOrNone(query.toSQL().sql);
    return new this(data);
  }

  public static async getMany<T>(this: GenericModel<T>, query: QueryBuilder): Promise<T[]> {
    const data = await raw.manyOrNone(query.toSQL().sql);
    return data.map(item => new this(item));
  }

  public static async save<T>(this: GenericModel<T>, entity: T): Promise<T> {
     const rawData = await db.table(this.tableName)
       .insert(entity)
       .returning('*');

     return new this(rawData);
  }

  public static async update<T>(this: GenericModel<T>, query: object, entity: Partial<T>): Promise<T> {

    const rawData = await db.table(this.tableName)
      .update(entity)
      .where(query)
      .returning('*');

    return new this(rawData);
  }

  public static async delete<T>(this: GenericModel<T>, query: object): Promise<void> {
    await db.table(this.tableName)
      .delete('')
      .where(query)
  }

}