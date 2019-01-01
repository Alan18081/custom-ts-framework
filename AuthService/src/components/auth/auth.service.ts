import { injectable, inject } from 'inversify';
import {Unauthorized, Messages, IUser, config, HashService, IProject} from '@astra/common';
import {JwtResponse} from './interfaces/jwt-response';
import { sign } from 'jsonwebtoken';
import { LoginDto } from './dto/login.dto';
import {JwtProject} from './interfaces/jwt-project';

@injectable()
export class AuthService {

    @inject(HashService)
    private readonly hashService: HashService;

    login(payload: LoginDto, user: IUser): JwtResponse {
        if(!this.hashService.compareHash(payload.password, user.password)) {
            throw new Unauthorized({ error: Messages.WRONG_PASSWORD });
        }

        const token = sign({ email: user.email, id: user.id }, config.common.jwtSecret);

        return {
            token,
            user
        }
    }

    loginProject({ id, clientId, clientSecret }: IProject): JwtProject {
        const token = sign({ id, clientId, clientSecret }, config.common.jwtProjectSecret);

        return {
            token
        }
    }

}