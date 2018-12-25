import { inject, injectable } from 'inversify';
import { ExtractJwt, Strategy as JwtStrategy, StrategyOptions } from 'passport-jwt';
import * as passport from 'passport';
import { PassportStatic } from 'passport';
import { config, Message, QueuesEnum, CommunicationCodes } from '@astra/common';
import { JwtPayload } from './interfaces/jwt-payload';
import { NextFunction, Request, Response } from 'express';
import { messageBroker } from '../../helpers/message-broker';

@injectable()
export class AuthService {
  private readonly passport: PassportStatic = passport;

  options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.common.jwtSecret
  };

  constructor() {
    passport.use(new JwtStrategy(this.options, async (payload: JwtPayload, done: Function) => {
      try {
        const message = new Message(CommunicationCodes.AUTH_BY_TOKEN, payload);
        const user = await messageBroker.sendMessageAndGetResponse(QueuesEnum.AUTH_SERVICE, message);
      } catch (e) {
        done(e);
      }
    }))
  }

  authenticateJwt(req: Request, res: Response, next: NextFunction): boolean {
    return this.passport.authenticate('jwt')(req, res, next);
  }

}