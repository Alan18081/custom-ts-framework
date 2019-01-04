import { injectable, interfaces } from 'inversify';
import { decode } from 'jsonwebtoken';
import { ExtractJwt, Strategy as JwtStrategy, StrategyOptions } from 'passport-jwt';
import * as passport from 'passport';
import { PassportStatic } from 'passport';
import {
    AuthorizedRequest,
    CommunicationCodes,
    config,
    IProject,
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
    passport.use(new JwtStrategy(this.options, (req: AuthorizedRequest, payload: JwtPayload, done: Function) => {
      console.log('Jwt payload', payload);
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

  async authenticateJwtProject(token: string): Promise<IProject> {
      const data = decode(token) as JwtProjectPayload;

      const message = await messageBroker.sendMessageAndGetResponse(
          QueuesEnum.PROJECTS_SERVICE,
          CommunicationCodes.GET_PROJECT,
          { id: data.id }
      );

      if(!message.payload) {
          throw new Unauthorized({ error: Messages.PROJECT_NOT_FOUND });
      }

      return message.payload;
  }

}