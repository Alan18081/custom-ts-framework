import {Injectable} from '../server/injector';

@Injectable()
export class AuthService {

  login() {
    console.log('Login process');
  }

}