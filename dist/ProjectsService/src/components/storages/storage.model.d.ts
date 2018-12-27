import { BaseModel, Storage } from '@astra/common';
export declare class StorageModel extends BaseModel<Storage> implements Storage {
    static tableName: string;
    id: number;
    name: string;
    description: string;
    path: string;
    projectId: number;
    userId: number;
    constructor(data: Partial<Storage>);
}
