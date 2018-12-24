import { db } from './knex';
import { QueryBuilder } from 'knex';

type GenericModel<T> = {
  new (...args: any[]): T;
  tableName: string;
}

export class BaseModel<T> {

  public static tableName = '';
  
  constructor(...args: any[]) {
    return new Proxy(this, this);
  };

  public static createQueryBuilder(): QueryBuilder {
    return db.queryBuilder();
  }

  public static async getOne<T>(this: GenericModel<T>, query: QueryBuilder): Promise<T | undefined> {
    try {
        const data = await query;
        console.log('Data', data);
        if(data[0]) {
            return new this(data[0]);
        }
    } catch (e) {
        console.log('[Database Error]', e);
    }

  }

  public static async getMany<T>(this: GenericModel<T>, query: QueryBuilder): Promise<T[]> {
    const data = await query;
    return data.map(item => new this(item));
  }

  public static async save<T>(this: GenericModel<T>, entity: T): Promise<T> {
     try {
         const rawData = await db.table(this.tableName)
             .insert(entity)
             .returning('*');

         console.log('Create user', rawData);

         const res = Reflect.construct(this, rawData);
         console.log('Wrapped User', res);
         return res;
     } catch (e) {
         console.log('[Database] Error', e);
     }
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