import { QueryBuilder } from 'knex';

export interface IBaseModel<T> {

  createQueryBuilder(): QueryBuilder;

  getOne(): Promise<T | undefined>;

  getMany(): Promise<T[]>;

  save(entity: T): Promise<T>;

  update(data: Partial<T>): Promise<T>;

  delete(query: any): Promise<void>

}