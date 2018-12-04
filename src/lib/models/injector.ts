import {METADATA} from './constants';
import {ColumnMetadata, ForeignKeyMetadata} from './interfaces';
import { db } from './knex';
import {QueryBuilder, TableBuilder} from 'knex';
import {METADATA_KEY} from '../../server';
import {EntityMetadata} from './entity-metadata';



export function InjectRepository(Entity: any): ParameterDecorator {
  return function (target: any, name: string, index: number): void {
    const types = Reflect.getMetadata('design:paramtypes', target);
    const entity: EntityMetadata = Reflect.getMetadata(METADATA.ENTITY, Entity);
    if(!entity) {
      throw new Error(`${Entity.name} has to be decorated by @Entity`);
    }

    const columns = Reflect.getMetadata(METADATA.COLUMNS, Entity);
    const foreignKeys = Reflect.getMetadata(METADATA.FOREIGN_KEYS, Entity) || [];

    if(!columns) {
      throw new Error('You must specify columns');
    }

    let args = [];

    const argsType = types[index];

    if(!Reflect.hasMetadata(METADATA_KEY.args, argsType)) {
      Reflect.defineMetadata(METADATA_KEY.args, args, argsType);
    } else {
      args = Reflect.getMetadata(METADATA_KEY.args, argsType);
    }
    args.push(entity.table);
    args.push(Entity);

  }
}