import { BaseModel } from '../../lib/models/base.model';
import { User } from './user.interface';
import { toNumber } from 'lodash';

export class UserModel extends BaseModel<User> {
  public static tableName: string = 'auth';

  public id?: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public positionId: number;
  public password: string;

  constructor(data: Partial<User>) {
    super();
    this.id        = data.id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.positionId = data.positionId && toNumber(data.positionId);
  }

}