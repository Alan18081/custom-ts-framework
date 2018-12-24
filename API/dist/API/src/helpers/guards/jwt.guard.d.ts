import { Guard } from '../../lib/server/guards-decorators';
import { Request, Response, NextFunction } from 'express';
export declare class JwtGuard implements Guard {
    private readonly authService;
    check(req: Request, res: Response, next: NextFunction): boolean | Promise<boolean>;
}
