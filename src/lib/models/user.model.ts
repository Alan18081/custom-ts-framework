import {BaseModel} from './base.model';
import {User} from './user.entity';


export class UserModel extends BaseModel {

  name: string;
  age: number;
  email: string;
  password: string;

  constructor(data?: Partial<UserModel>) {
    super();
    if(data) {
      this.name = data.name || '';
      this.age = data.age || 0;
      this.email = data.email || '';
      this.password = data.password || '';
    }

  }

}

const user = new UserModel();
user.name = 'Alex';
user.age = 25;
user.email = 'test@gmail.com';
user.password = '123456';

const queryBuilder = UserModel.createQueryBuilder();

UserModel.getOne();