import { Guard } from '../../lib/server/guards-decorators';
import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { AuthService } from '../../components/auth/auth.service';

@injectable()
export class JwtGuard implements Guard {

  @inject(AuthService)
  private readonly authService: AuthService;

  check(req: Request, res: Response, next: NextFunction): boolean | Promise<boolean> {
    return this.authService.authenticateJwt(req, res, next);
  }
}