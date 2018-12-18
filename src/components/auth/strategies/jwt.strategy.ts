import {Injectable} from '../../../common/server/injector';
import * as passport from 'passport';
import {ExtractJwt, Strategy, StrategyOptions} from 'passport-jwt';
import {AuthService} from '../auth.service';
import {JWT_SECRET} from '../../../config/common';

@Injectable()
export class JwtStrategy {
    config: StrategyOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: JWT_SECRET
    };

    constructor(
       private readonly authService: AuthService
    ) {
        const strategy = new Strategy(this.config, (jwtPayload: any, done: Function) => {
            try {
                this.authService.checkUserByJwt()
                    .then(user => {
                        if(user) {
                            done(null, user);
                        } else {
                            done('User doesn\'t exists', false);
                        }
                    });
            } catch (e) {
                done(e, false);
            }
        });

        passport.use(strategy);
    }
}