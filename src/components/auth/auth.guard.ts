import {Guard} from "../../common/server/guards-decorators";
import { NextFunction, Request, Response } from "express";
import { Injectable } from '../../common/server/injector';
import * as passport from 'passport';

@Injectable()
export class AuthGuard implements Guard {

    async check(req: Request, res: Response, next: NextFunction): Promise<boolean> {
       return passport.authenticate('jwt')(req, res, next);
    }
}