import { Module } from '../../lib/modules/module.inversify';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserModel } from './user.model';
import {CoreModule} from '../core/core.module';

@Module({
  imports: [CoreModule],
  controllers: [],
  services: [UsersService, UserModel],
  handlers: [UsersController]
})
export class UsersModule {}