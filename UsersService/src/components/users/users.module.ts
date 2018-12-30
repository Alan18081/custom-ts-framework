import { Module } from '@astra/common';
import { UsersService } from './users.service';
import { UsersHandler } from './users.handler';
import {CoreModule} from '../core/core.module';
import {UsersRepository} from './users.repository';

@Module({
  imports: [CoreModule],
  services: [UsersService, UsersRepository],
  handlers: [UsersHandler],
})
export class UsersModule {}