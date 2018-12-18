import {Injectable} from '../../common/server/injector';

@Injectable()
export class AuthService {

  login() {
    console.log('Login process');
  }

}