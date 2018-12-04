import { Module } from '../../module';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {AuthModule} from '../auth/auth.module';
import {DbModule} from '../../lib/modules/db.module';

@Module({
  imports: [AuthModule, DbModule],
  controllers: [UsersController],
  services: [UsersService],
  exports: []
})
export class UsersModule {}