export interface IStorage {
    id: number;
    name: string;
    description: string;
    path: string;
    projectId: number;
    dataId: string;
    data?: object;
}
