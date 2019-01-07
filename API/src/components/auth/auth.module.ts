import { Module } from '@astra/common';
import { AuthController } from './auth.controller';
import { JwtGuard } from '../../helpers/guards/jwt.guard';
import { AuthService } from './auth.service';
import { injectable } from 'inversify';
import {JwtProjectGuard} from '../../helpers/guards/jwt-project.guard';
import {JwtProjectAccountGuard} from '../../helpers/guards/jwt-project-account.guard';

@Module({
  controllers: [AuthController],
  services: [JwtGuard, AuthService, JwtProjectGuard, JwtProjectAccountGuard]
})
@injectable()
export class AuthModule {}