import { toString, toNumber } from 'lodash';
import { IStorageData } from '@astra/common';

export class StorageData implements IStorageData {

    public _id: string;
    public storageId: number;
    public projectId: number;
    public userId: number;
    public data: object;

    constructor(data: any) {
        this._id = data._id && toString(data._id);
        this.storageId = toNumber(data.storageId);
        this.projectId = toNumber(data.projectId);
        this.userId = toNumber(data.userId);
        this.data = data.data;
    }

}