import { Module } from '@astra/common';
import { AuthController } from './auth.controller';
import { JwtGuard } from '../../helpers/guards/jwt.guard';
import { AuthService } from './auth.service';
import { injectable } from 'inversify';
import {JwtProjectGuard} from '../../helpers/guards/jwt-project.guard';

@Module({
  controllers: [AuthController],
  services: [JwtGuard, AuthService, JwtProjectGuard]
})
@injectable()
export class AuthModule {}