import { Injectable } from '../injector';

@Injectable()
export class UsersService {
  findOne() {
    console.log('Hi from user service');
  }
}