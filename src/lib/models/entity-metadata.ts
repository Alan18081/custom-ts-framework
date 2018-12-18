export class EntityMetadata {
  table: string = '';
  oneToOne: EntityMetadata[] = [];
  oneToMany: EntityMetadata[] = [];
  manyToOne: EntityMetadata[] = [];
  manyToMany: EntityMetadata[] = [];
}