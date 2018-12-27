import { Module } from '@astra/common';
import { UsersService } from './users.service';
import { UsersHandler } from './users.handler';
import {CoreModule} from '../core/core.module';

@Module({
  imports: [CoreModule],
  services: [UsersService],
  handlers: [UsersHandler]
})
export class UsersModule {}