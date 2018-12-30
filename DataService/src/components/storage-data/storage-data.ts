import { toNumber, toString } from 'lodash';
import { IStorageData } from '@astra/common';

export class StorageData implements IStorageData {

    public id: string;
    public storageId: number;
    public data: object;

    constructor(data: Partial<StorageData>) {
        this.id = toString(data.id);
        this.storageId = toNumber(data.storageId);
        this.data = data.data;
    }

}