import {Module} from '../../lib/modules/module.inversify';
import { UsersController } from './users.controller';
import {UsersService} from './users.service';
import {UsersFilter} from './users.filter';

@Module({
    services: [UsersService, UsersFilter],
    controllers: [UsersController]
})
export class UsersModule {}