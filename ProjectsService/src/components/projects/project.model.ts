import {BaseModel, Project} from '@astra/common';
import { toNumber } from 'lodash';

export class ProjectModel extends BaseModel<Project> implements Project {

    id?: number;
    name: string;
    description?: string;
    clientId: string;
    clientSecret: string;
    authProjectId?: number;
    storagesCount: number;
    userId: number;
    createdAt: Date;

    constructor(data: Partial<Project>) {
        super();
        this.id = toNumber(data.id);
        this.name = data.name;
        this.description = data.description;
        this.clientId = data.clientId;
        this.clientSecret = data.clientSecret;
        this.userId = toNumber(data.userId);
        this.createdAt = new Date();
    }

}