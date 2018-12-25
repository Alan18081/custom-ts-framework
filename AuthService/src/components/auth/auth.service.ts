import { injectable, inject } from 'inversify';
import {User} from '../../helpers/interfaces/user.interface';
import {JwtResponse} from './interfaces/jwt-response';
import {PasswordsService} from '../core/services/passwords.service';
import { Unauthorized } from '../../helpers/http-errors';
import { Messages } from '../../../../Common/src';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '../../config/common';
import { LoginDto } from './dto/login.dto';

@injectable()
export class AuthService {

    @inject(PasswordsService)
    private readonly passwordsService: PasswordsService;

    async login(payload: LoginDto, user: User): Promise<JwtResponse> {
        if(!this.passwordsService.comparePassword(payload.password, user.password)) {
            throw new Unauthorized({ error: Messages.WRONG_PASSWORD });
        }

        const token = sign({ email: user.email, id: user.id }, JWT_SECRET);

        return {
            token,
            user
        }
    }

}