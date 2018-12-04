import {Injectable} from '../../lib/server/injector';

@Injectable()
export class AuthService {

  login() {
    console.log('Login process');
  }

}