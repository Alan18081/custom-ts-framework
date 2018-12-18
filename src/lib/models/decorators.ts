import {METADATA, TYPES} from './constants';
import {ColumnMetadata, ForeignKeyMetadata} from './interfaces';
import {EntityMetadata} from './entity-metadata';
import {createTable} from './helpers';
import {Table} from './table';

export function Entity(): ClassDecorator {
  return function (target: any): void {
    let entityMetadata: EntityMetadata = new EntityMetadata();
    if(!Reflect.hasMetadata(METADATA.ENTITY, target)) {
      Reflect.defineMetadata(METADATA.ENTITY, entityMetadata,target)
    } else {
      entityMetadata = Reflect.getMetadata(METADATA.ENTITY, target);
    }
    entityMetadata.table = `${target.name.toLowerCase()}s`;

    const columns = getColumns(target);
    const foreignKeys = getForeignKeys(target);

    const table = new Table(entityMetadata.table, columns, foreignKeys);

    const tables = getTables(Reflect);

    tables.push(table);

  }
}

export function Column(type: TYPES): PropertyDecorator {
  return function (target: any, name: string): void {
    let columns = [];
    if(!Reflect.hasMetadata(METADATA.COLUMNS, target.constructor)) {
      Reflect.defineMetadata(METADATA.COLUMNS, columns, target.constructor);
    } else {
      columns = Reflect.getMetadata(METADATA.COLUMNS, target.constructor);
    }
    const columnMetadata: ColumnMetadata = {
      name,
      type
    };

    columns.push(columnMetadata);
  }
}

export function PrimaryGeneratedColumn(): PropertyDecorator  {
  return function (target: any, name: string)  {
    let columns = [];
    if(!Reflect.hasMetadata(METADATA.COLUMNS, target.constructor)) {
      Reflect.defineMetadata(METADATA.COLUMNS, columns, target.constructor);
    } else {
      columns = Reflect.getMetadata(METADATA.COLUMNS, target.constructor);
    }
    const columnMetadata: ColumnMetadata = {
      name,
      type: TYPES.INCREMENTS,
      isPrimary: true
    };

    columns.push(columnMetadata);
  }
}

export function PrimaryColumn(type: TYPES): PropertyDecorator {
  return function (target: any, name: string): void {
    let columns = [];
    if(!Reflect.hasMetadata(METADATA.COLUMNS, target.constructor)) {
      Reflect.defineMetadata(METADATA.COLUMNS, columns, target.constructor);
    } else {
      columns = Reflect.getMetadata(METADATA.PRIMARY_COLUMNS, target.constructor);
    }
    const columnMetadata: ColumnMetadata = {
      name,
      type,
      isPrimary: true
    };

    columns.push(columnMetadata);
  }
}

export function OneToOne<T>(getEntity: Function): PropertyDecorator {
  return function(target: any, name: string): void {
    const entity: T = getEntity();
    let entityMetadata: EntityMetadata = new EntityMetadata();
    if(!Reflect.hasMetadata(METADATA.ENTITY, target.constructor)) {
      Reflect.defineMetadata(METADATA.ENTITY, entityMetadata,target.constructor)
    } else {
      entityMetadata = Reflect.getMetadata(METADATA.ENTITY, target.constructor);
    }

    const foreignEntityMetadata: EntityMetadata = Reflect.getMetadata(METADATA.ENTITY, entity);

    if(!foreignEntityMetadata) {
      throw new Error('You can define relations only with entity');
    }

    const keys = getForeignKeys(target.constructor);

    const keyMetadata: ForeignKeyMetadata = {
      key: foreignEntityMetadata.table.replace(/s/, '') + 'Id',
      reference: foreignEntityMetadata.table
    };

    keys.push(keyMetadata);

    entityMetadata.oneToOne.push(foreignEntityMetadata);
  }
}

function getColumns(target: any): ColumnMetadata[] {
  let columns = [];
  if(!Reflect.hasMetadata(METADATA.COLUMNS, target)) {
    Reflect.defineMetadata(METADATA.COLUMNS, columns, target);
  } else {
    columns = Reflect.getMetadata(METADATA.COLUMNS, target);
  }

  return columns;
}

function getForeignKeys(target: FunctionConstructor): ForeignKeyMetadata[] {
  let keys = [];
  if(!Reflect.hasMetadata(METADATA.FOREIGN_KEYS, target)) {
    Reflect.defineMetadata(METADATA.FOREIGN_KEYS, keys, target);
  } else {
    keys = Reflect.getMetadata(METADATA.FOREIGN_KEYS, target);
  }

  return keys;
}

function getTables(target: any): Table[] {
  let tables: Table[] = [];
  if(!Reflect.hasMetadata(METADATA.TABLES, target)) {
    Reflect.defineMetadata(METADATA.TABLES, tables, target);
  } else {
    tables = Reflect.getMetadata(METADATA.TABLES, target);
  }

  return tables;
}

