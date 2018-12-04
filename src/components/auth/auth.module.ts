import {Module} from '../../module';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';

@Module({
  imports: [],
  controllers: [AuthController],
  services: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}