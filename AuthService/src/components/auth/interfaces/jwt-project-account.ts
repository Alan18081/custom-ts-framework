import {IProjectAccount} from '@astra/common';

export interface JwtProjectAccount {
    token: string;
    user: IProjectAccount;
}