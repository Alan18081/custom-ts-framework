import { Guard } from '@astra/common';
import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { AuthService } from '../../components/auth/auth.service';

@injectable()
export class JwtGuard implements Guard {

  @inject(AuthService)
  private readonly authService: AuthService;

  check(req: Request, res: Response, next: NextFunction): void | Promise<void> {
    console.log('JWT Guard');
    return this.authService.authenticateJwt(req, res, next);
  }
}