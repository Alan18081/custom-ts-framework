import { Module } from '../module';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {AuthModule} from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [UsersController],
  services: [UsersService]
})
export class UsersModule {}