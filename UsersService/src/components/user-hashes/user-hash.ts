import {IUserHash} from '@astra/common';
import { toNumber } from 'lodash';

export class UserHash implements IUserHash {
    public id: number;
    public userId: number;
    public hash: string;

    constructor(data: Partial<UserHash>) {
        this.id = toNumber(data.id);
        this.userId = data.userId;
        this.hash = data.hash;
    }
}