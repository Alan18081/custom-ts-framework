import {BaseModel, Project} from '@astra/common';
import { toNumber } from 'lodash';

export class ProjectModel extends BaseModel<Project> implements Project {
    static tableName = 'projects';

    public id: number;
    public name: string;
    public description?: string;
    public clientId: string;
    public clientSecret: string;
    public authProjectId?: number;
    public storagesCount: number;
    public userId: number;
    public createdAt: Date;

    constructor(data: Partial<Project>) {
        super();
        this.name = data.name;
        this.description = data.description;
        this.clientId = data.clientId;
        this.clientSecret = data.clientSecret;
        this.userId = toNumber(data.userId);
        this.createdAt = new Date();
    }

}