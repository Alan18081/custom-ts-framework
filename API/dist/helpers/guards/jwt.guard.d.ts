import { Guard } from '@astra/common';
import { Request, Response, NextFunction } from 'express';
export declare class JwtGuard implements Guard {
    private readonly authService;
    check(req: Request, res: Response, next: NextFunction): boolean | Promise<boolean>;
}
