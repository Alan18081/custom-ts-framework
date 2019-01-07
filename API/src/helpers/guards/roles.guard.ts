import { injectable } from 'inversify';
import { Response, NextFunction } from 'express';
import { AuthRequest, Guard, Roles, Forbidden, Messages } from '@astra/common';

@injectable()
export class RolesGuard implements Guard {

  constructor(
    private readonly requiredRole: Roles
  ) {}


  check(req: AuthRequest, res: Response, next: NextFunction): void {
    console.log(req.user, 'Roles guard');
    if(req.user.roleId !== this.requiredRole) {
      throw new Forbidden({ error: Messages.INVALID_PERMISSIONS });
    }
    next();
  }
}