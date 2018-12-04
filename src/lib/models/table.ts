import {ColumnMetadata, ForeignKeyMetadata} from './interfaces';
export class Table {
  constructor(
    public name: string,
    public columns: ColumnMetadata[],
    public foreignKeys: ForeignKeyMetadata[]
  ) {}
}