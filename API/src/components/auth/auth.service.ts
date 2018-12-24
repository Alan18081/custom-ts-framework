import { inject, injectable } from 'inversify';
import { ExtractJwt, Strategy as JwtStrategy, StrategyOptions } from 'passport-jwt';
import * as passport from 'passport';
import { PassportStatic } from 'passport';
import { config } from '../../../../config';
import { JwtPayload } from './interfaces/jwt-payload';
import { NextFunction, Request, Response } from 'express';
import { messageBroker } from '../../lib/broker/message-broker';
import { CommunicationCodes, QueuesEnum, Message } from '../../../../Common';

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