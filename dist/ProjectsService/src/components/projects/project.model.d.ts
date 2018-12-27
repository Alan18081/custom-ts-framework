import { BaseModel, Project } from '@astra/common';
export declare class ProjectModel extends BaseModel<Project> implements Project {
    static tableName: string;
    id: number;
    name: string;
    description?: string;
    clientId: string;
    clientSecret: string;
    authProjectId?: number;
    storagesCount: number;
    userId: number;
    createdAt: Date;
    constructor(data: Partial<Project>);
}
