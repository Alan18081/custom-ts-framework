import {IBaseModel} from './base-model.interface';
import {queryBuilder, QueryBuilder, raw} from 'knex';

export class BaseModel<T> {

  public static table: string = '';

  public static createQueryBuilder(): QueryBuilder {
    return queryBuilder();
  }

  public static async getOne(query: QueryBuilder, Type: FunctionConstructor): Promise<T | undefined> {
    const data = await raw(query.toSQL().sql);
    return new Type(data[0]);
  }

  public static async getMany(query: QueryBuilder, Type: FunctionConstructor): Promise<T[]> {
    const data = await raw(query.toSQL().sql);
    return data.map(item => new Type(item));
  }

}