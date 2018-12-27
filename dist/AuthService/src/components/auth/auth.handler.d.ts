import { JwtResponse } from './interfaces/jwt-response';
import { LoginDto } from './dto/login.dto';
export declare class AuthHandler {
    private readonly authService;
    private readonly validatorService;
    login(payload: LoginDto): Promise<JwtResponse>;
}
