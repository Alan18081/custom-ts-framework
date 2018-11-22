import { Injectable } from '../injector';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class UsersService {

  constructor(
    private readonly authService: AuthService
  ) {}

  findOne() {
    console.log(this.authService.login());
    console.log('Hi from user service');
  }
}