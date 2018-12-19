import { BaseModel } from '../../common/models/base.model';
import { User } from './user.interface';
import { toNumber } from 'lodash';

export class UserModel extends BaseModel<User> {
  public static tableName: string = 'users';

  public id?: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public position_id: number;

  constructor(data: User) {
    super();
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.position_id = toNumber(data.position_id);
  }

}