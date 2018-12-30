import {IUser, Roles} from '@astra/common';
import { toNumber } from 'lodash';

export class User implements IUser {

  public id: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public roleId: number;

  constructor(data: Partial<User>) {

    this.id = data.id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.roleId = data.roleId ? toNumber(data.roleId) : Roles.USER;
  }

}