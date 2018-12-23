import { injectable, inject } from 'inversify';
import {User} from '../../helpers/interfaces/user.interface';
import {JwtResponse} from './jwt-response';
import {PasswordsService} from '../core/services/passwords.service';
import { Unauthorized } from '../../helpers/http-errors';
import { Messages } from '../../../../Common/messages';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '../../config/common';

@injectable()
export class AuthService {

    @inject(PasswordsService)
    private readonly passwordsService: PasswordsService;

    async login(payload: LoginDto, { email, id }: User): Promise<JwtResponse> {
        if(!this.passwordsService.comparePassword(payload.password, user.password)) {
            throw new Unathorized(Messages.WRONG_PASSWORD);
        }

        const token = sign({ email, id }, JWT_SECRET);

        return {
            token
        }
    }

}