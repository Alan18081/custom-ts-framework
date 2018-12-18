import { db } from './knex';
import * as pg from 'pg-promise';
import { QueryBuilder } from 'knex';

const raw = pg()({});

type GenericModel<T> = {
  new (...args: any[]): T;
}

export class BaseModel<T> {

  public static table: string = '';
  private fieldsToUpdate: string[] = [];

  constructor(data: any) {
    return new Proxy(this, this);
  };

  public set (target: BaseModel<T>, property: string | symbol | number): boolean {
    if(typeof property === 'string') {
      this.fieldsToUpdate.push(property);
    }
    return true;
  }

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

}