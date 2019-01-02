import { toString, toNumber } from 'lodash';
import { IStorageRecord } from '@astra/common';

export class StorageRecord implements IStorageRecord {

    public _id: string;
    public storageId: number;
    public projectId: number;
    public userId: number;
    public path: string;
    public data: object;

    constructor(data: Partial<StorageRecord>) {
        this._id = data._id && toString(data._id);
        this.storageId = toNumber(data.storageId);
        this.projectId = toNumber(data.projectId);
        this.userId = toNumber(data.userId);
        this.path = data.path;
        this.data = data.data || {};
    }

}