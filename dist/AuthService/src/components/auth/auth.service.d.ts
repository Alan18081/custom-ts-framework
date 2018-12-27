import { User } from '@astra/common';
import { JwtResponse } from './interfaces/jwt-response';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private readonly passwordsService;
    login(payload: LoginDto, user: User): Promise<JwtResponse>;
}
