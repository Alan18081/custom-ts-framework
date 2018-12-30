import { IUser } from '@astra/common';

export interface JwtResponse {
    token: string;
    user: IUser;
}