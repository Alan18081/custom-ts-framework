export enum METADATA {
  ENTITY = 'entity',
  COLUMNS = 'columns',
  TABLES = 'tables',
  PRIMARY_COLUMNS = 'primaryColumns',
  FOREIGN_KEYS = 'foreignKeys',
  ONE_TO_ONE = 'oneToOne',
  ONE_TO_MANY = 'oneToMany',
  MANY_TO_ONE = 'manyToOne',
  MANY_TO_MANY = 'manyToMany'
};

export enum TYPES {
  INCREMENTS = 'increments',
  VARCHAR = 'string',
  INT = 'integer',
  TEXT = 'text',
  BOOL = 'boolean',
  DATE = 'date',
  DATE_TIME = 'dateTime'
};