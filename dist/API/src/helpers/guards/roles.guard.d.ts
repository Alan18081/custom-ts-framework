import { Response, NextFunction } from 'express';
import { AuthorizedRequest, Guard, Roles } from '@astra/common';
export declare class RolesGuard implements Guard {
    private readonly requiredRole;
    constructor(requiredRole: Roles);
    check(req: AuthorizedRequest, res: Response, next: NextFunction): boolean | Promise<boolean>;
}
