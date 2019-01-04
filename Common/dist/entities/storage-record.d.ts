export interface IStorageRecord {
    _id: string;
    storageId: number;
    projectId: number;
    userId: number;
    path: string;
    data: object;
}
