import { injectable } from 'inversify';
import { ExtractJwt, Strategy as JwtStrategy, StrategyOptions } from 'passport-jwt';
import * as passport from 'passport';
import { PassportStatic } from 'passport';
import {AuthorizedRequest, CommunicationCodes, config, Messages, QueuesEnum, Unauthorized} from '@astra/common';
import { JwtPayload } from './interfaces/jwt-payload';
import { NextFunction, Request, Response } from 'express';
import { messageBroker } from '../../helpers/message-broker';

@injectable()
export class AuthService {
  private readonly passport: PassportStatic = passport;

  options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.common.jwtSecret,
    passReqToCallback: true
  };

  constructor() {
    passport.use(new JwtStrategy(this.options, (req: AuthorizedRequest, payload: JwtPayload, done: Function) => {
      const result = async () => {
        const message = await messageBroker.sendMessageAndGetResponse(
            QueuesEnum.USERS_SERVICE,
            CommunicationCodes.GET_USER_BY_EMAIL,
            { email: payload.email }
        );

        return message.payload;
      };

      result()
        .then(user => {
          if(user) {
              req.user = user;
              console.log('Requested user', req.user);
              done(null, user);
          } else {
              done({ error: Messages.USER_NOT_FOUND }, false);
          }
        })
        .catch(err => done(err))
    }))
  }

  authenticateJwt(req: Request, res: Response, next: NextFunction): void {
    this.passport.authenticate('jwt', { session: false }, () => {
        next();
    })(req, res, next);
  }

}