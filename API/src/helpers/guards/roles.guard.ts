import { injectable } from 'inversify';
import { Response, NextFunction } from 'express';
import { AuthorizedRequest, Guard, Roles } from '@astra/common';

@injectable()
export class RolesGuard implements Guard {

  constructor(
    private readonly requiredRole: Roles
  ) {}


  check(req: AuthorizedRequest, res: Response, next: NextFunction): boolean | Promise<boolean> {
    return req.user.roleId === this.requiredRole;
  }
}