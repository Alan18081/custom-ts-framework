import { StrategyOptions } from 'passport-jwt';
import { NextFunction, Request, Response } from 'express';
export declare class AuthService {
    private readonly passport;
    options: StrategyOptions;
    constructor();
    authenticateJwt(req: Request, res: Response, next: NextFunction): boolean;
}
