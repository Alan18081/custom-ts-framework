import * as passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy, StrategyOptions } from 'passport-jwt';
import { JwtPayload } from '../../components/auth/interfaces/jwt-payload';
import { config } from '../../../../config';



const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.common.jwtSecret
};

passport.use(new JwtStrategy(options, (payload: JwtPayload) => {
  console.log(payload);
}));

export const authenticateJwt = passport.authenticate('jwt');