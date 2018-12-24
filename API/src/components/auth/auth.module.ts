import { Module } from '../../lib/modules/module.inversify';
import { AuthController } from './auth.controller';
import { JwtGuard } from '../../helpers/guards/jwt.guard';
import { AuthService } from './auth.service';
import { injectable } from 'inversify';
import { BrokerModule } from '../broker/broker.module';

@Module({
  imports: [BrokerModule],
  controllers: [AuthController],
  services: [JwtGuard, AuthService]
})
@injectable()
export class AuthModule {}