import {db} from './knex';
import {QueryBuilder} from 'knex';
import {METADATA} from './constants';

interface QueryOptions {
  [key: string]: string;
}

interface Config {
  relations?: string[];
}

export class Repository<T> {
  private readonly table: QueryBuilder;
  private readonly type: T;

  constructor(tableName: string, type: T) {
   this.table = db.table(tableName);
   this.type = type;
  }

  async find(options: QueryOptions = {}, config: Config = {}): Promise<T[]> {
    const query = this.table.select('*');
    if(config.relations && config.relations.length) {
      const entityMetadata = Reflect.getMetadata(METADATA.ENTITY, this.type);
      console.log(entityMetadata);
      config.relations.forEach(table => {

      });
    }

    return await query
      .where(options);
  }

  async findOne(options: QueryOptions = {}, config: Config = {}): Promise<T | undefined> {
    const result = await this.find(options, config);
    return result[0];
  }

  getQueryBuilder(): QueryBuilder {
    return this.table;
  }

  async save(entity: T): Promise<T> {
    const res = await this.table.insert(entity, 'id');
    const data =  await this.table.select('*').where({ id: res[0] });

    return data[0];
  }

  async update(query: QueryOptions, data: Partial<T>): Promise<T | undefined> {
    const res = await this.table.update(data).where(query).return('id');
    const entitiesList = await this.table.select('*').where({ id: res[0] });

    return entitiesList[0];
  }

  async delete(query: QueryOptions): Promise<void> {
    await this.table.delete().where(query);
  }

}