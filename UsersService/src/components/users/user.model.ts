import { BaseModel, User } from '@astra/common';
import { toNumber } from 'lodash';

export class UserModel extends BaseModel implements User {
  public static tableName: string = 'users';

  public id: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public positionId: number;
  public password: string;
  public roleId: number;

  constructor(data: Partial<User>) {
    super();
    this.id = data.id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.positionId = data.positionId && toNumber(data.positionId);
    this.roleId = data.roleId && toNumber(data.roleId);
  }

}