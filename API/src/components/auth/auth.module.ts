import { Module } from '@astra/common';
import { AuthController } from './auth.controller';
import { JwtGuard } from '../../helpers/guards/jwt.guard';
import { AuthService } from './auth.service';
import { injectable } from 'inversify';

@Module({
  controllers: [AuthController],
  services: [JwtGuard, AuthService]
})
@injectable()
export class AuthModule {}