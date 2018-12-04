import {METADATA, TYPES} from './constants';

export interface ColumnMetadata {
  readonly name: string,
  readonly type: TYPES,
  readonly isPrimary?: boolean
}

export interface ForeignKeyMetadata {
  key: string;
  reference: string;
}