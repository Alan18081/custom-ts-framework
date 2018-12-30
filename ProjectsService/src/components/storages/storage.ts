import { IStorage } from '@astra/common';
import { toNumber, toString } from 'lodash';

export class Storage implements IStorage {
  public id: number;
  public name: string;
  public description: string;
  public path: string;
  public projectId: number;
  public data: object;
  public dataId?: string;

  constructor(data: Partial<Storage>) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.path = data.path;
    this.projectId = toNumber(data.projectId);
    this.dataId = toString(data.dataId);

    if(data.data) this.data = data.data;
  }


}