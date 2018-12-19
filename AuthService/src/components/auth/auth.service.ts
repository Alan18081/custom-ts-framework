import {Injectable} from '../../common/server/injector';
import { JwtResponse } from './interfaces/jwt-response';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {


  constructor(
    private readonly usersService: UsersService
  ) {}


  async checkUserByJwt(): Promise<boolean> {

  }

  async login(payload: LoginDto): Promise<JwtResponse> {

  }

}