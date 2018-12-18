import {Module} from '../../module';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {AuthGuard} from "./auth.guard";

@Module({
  imports: [],
  controllers: [AuthController],
  services: [AuthService, AuthGuard],
  exports: [AuthService],
})
export class AuthModule {}