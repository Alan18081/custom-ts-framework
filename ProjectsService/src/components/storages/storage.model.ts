import { BaseModel, Storage } from '@astra/common';
import { toNumber } from 'lodash';

export class StorageModel extends BaseModel<Storage> implements Storage {
  public static tableName = 'storages';

  public id: number;
  public name: string;
  public description: string;
  public path: string;
  public projectId: number;
  public userId: number;

  constructor(data: Partial<Storage>) {
    super();

    this.name = data.name;
    this.description = data.description;
    this.path = data.path;
    this.projectId = toNumber(data.projectId);
    this.userId = toNumber(data.userId);
  }


}