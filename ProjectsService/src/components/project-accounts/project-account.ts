import { toNumber } from 'lodash';
import { IProjectAccount } from '@astra/common';

export class ProjectAccount implements IProjectAccount {
    public id: number;
    public login: string;
    public email: string;
    public password: string;
    public projectId: number;
    public createdAt: Date;
    public deletedAt: Date;

    constructor(data: Partial<ProjectAccount>) {
        this.id = data.id;
        this.login = data.login;
        this.email = data.email;
        this.password = data.password;
        this.projectId = toNumber(data.projectId);
        this.createdAt = data.createdAt || new Date();
    }
}