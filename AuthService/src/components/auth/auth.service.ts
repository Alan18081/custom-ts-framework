import { injectable, inject } from 'inversify';
import { Unauthorized, Messages, User, config } from '@astra/common';
import {JwtResponse} from './interfaces/jwt-response';
import {PasswordsService} from '../core/services/passwords.service';
import { sign } from 'jsonwebtoken';
import { LoginDto } from './dto/login.dto';

@injectable()
export class AuthService {

    @inject(PasswordsService)
    private readonly passwordsService: PasswordsService;

    async login(payload: LoginDto, user: User): Promise<JwtResponse> {
        if(!this.passwordsService.comparePassword(payload.password, user.password)) {
            throw new Unauthorized({ error: Messages.WRONG_PASSWORD });
        }

        const token = sign({ email: user.email, id: user.id }, config.common.jwtSecret);

        return {
            token,
            user
        }
    }

}