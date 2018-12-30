import {IProject} from '@astra/common';
import { toNumber } from 'lodash';

export class Project implements IProject {
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

        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.clientId = data.clientId;
        this.clientSecret = data.clientSecret;
        this.userId = toNumber(data.userId);
        this.createdAt = new Date();
    }

}