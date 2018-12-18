import {Injectable} from '../../common/server/injector';
import * as passport from 'passport';

@Injectable()
export class AuthService {


  constructor() {

  }


  login() {
    console.log('Login process');
  }

}