import {Guard} from "../../common/server/guards-decorators";
import {Request, Response} from "express";
import {AuthService} from "./auth.service";
import { Injectable } from '../../common/server/injector';
import { Unathorized } from '../../helpers/http-errors';
import * as passport from 'passport';

@Injectable()
export class AuthGuard implements Guard {

    constructor(
       private readonly authService: AuthService
    ) {}

    async check(req: Request, res: Response): Promise<boolean> {
    }
}