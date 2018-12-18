import {db} from './knex';
import {ColumnMetadata, ForeignKeyMetadata} from './interfaces';
import {TableBuilder} from 'knex';
import {Table} from './table';

export async function createTable(table: Table) {
  const { name, columns, foreignKeys } = table;
  const isExists = await db.schema.hasTable(name);

  if(!isExists) {
    await db.schema.createTable(name, (tableBuilder: TableBuilder) => {
      console.log(name, columns, foreignKeys);
      columns.forEach(({name, type, isPrimary}: ColumnMetadata) => {
        tableBuilder[type](name);
      });


      foreignKeys.forEach(({ key, reference }: ForeignKeyMetadata) => {
        tableBuilder.integer(key).unsigned();
        tableBuilder
          .foreign(key)
          .references(`${reference}.id`)
      });

      // const primaryColumnNames = columns
      //   .filter(({ isPrimary }: ColumnMetadata) => isPrimary)
      //   .map(({ name }: ColumnMetadata) => name);

      // tableBuilder.primary(['id']);
    });
  }
}