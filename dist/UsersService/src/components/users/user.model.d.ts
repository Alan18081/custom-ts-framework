import { BaseModel, User } from '@astra/common';
export declare class UserModel extends BaseModel<User> {
    static tableName: string;
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    positionId: number;
    password: string;
    roleId: number;
    constructor(data: Partial<User>);
}
