import { injectable } from 'inversify';
import { decode } from 'jsonwebtoken';
import { ExtractJwt, Strategy as JwtStrategy, StrategyOptions } from 'passport-jwt';
import * as passport from 'passport';
import { PassportStatic } from 'passport';
import {
    AuthRequest,
    CommunicationCodes,
    config,
    IProject, IProjectAccount,
    Messages,
    QueuesEnum,
    Unauthorized
} from '@astra/common';
import { JwtPayload } from './interfaces/jwt-payload';
import { NextFunction, Request, Response, RequestHandler } from 'express';
import { messageBroker } from '../../helpers/message-broker';
import {JwtProjectPayload} from './interfaces/jwt-project-payload';

@injectable()
export class AuthService {
  private readonly passport: PassportStatic = passport;

  options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.common.jwtSecret,
    passReqToCallback: true
  };

  constructor() {
    passport.use(new JwtStrategy(this.options, (req: AuthRequest, payload: JwtPayload, done: Function) => {
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

  authenticateJwt(req: Request, res: Response, next: NextFunction): RequestHandler {
    return this.passport.authenticate('jwt', { session: false }, (err, user, info) => {

      if(user) {
        next();
      } else {
        throw new Unauthorized({ error: Messages.INVALID_TOKEN });
      }
    })(req, res, next);
  }

  async authenticateJwtProject(token: string): Promise<JwtProjectPayload> {
      return decode(token) as JwtProjectPayload;
  }

  async authenticateJwtProjectAccount(projectAccountToken: string): Promise<JwtPayload> {
    return decode(projectAccountToken) as JwtPayload;
  }

}