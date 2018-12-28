import { db } from './knex';
import { QueryBuilder } from 'knex';

type GenericModel<T> = {
  new (...args: any[]): T;
  tableName: string;
}

export class BaseModel {

  constructor(...args: any[]) {
    return new Proxy(this, this);
  };

  public static createQueryBuilder(): QueryBuilder {
    return db.queryBuilder();
  }

  public static async find<T>(this: GenericModel<T>, query: object, columns?: string[]): Promise<T[]> {
    const sql = db.table(this.tableName);

    if(columns) {
      sql.select(...columns);
    } else {
      sql.select('*')
    }

    const data = await sql.where(query);
    return data.map(item => new this(item));
  }

  public static async findOne<T extends BaseModel>(this: GenericModel<T>, query: object, columns?: string[]): Promise<T | undefined> {
    const sql = db.table(this.tableName);

    if(columns) {
      sql.select(...columns);
    } else {
      sql.select('*')
    }

    const data = await sql.where(query);
    return new this(data[0]);
  }

  public static async save<T>(this: GenericModel<T>, entity: BaseModel): Promise<T> {
    if(!(entity instanceof this)) {
      throw new Error('Entity should be an instance of model');
    }

     const rawData = await db.table(this.tableName)
       .insert(entity)
       .returning('*');

     return new this(rawData);
  }

  public static async update<T>(this: GenericModel<T>, query: object, entity: Partial<T>): Promise<T | undefined> {

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