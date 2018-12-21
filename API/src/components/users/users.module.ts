import {Module} from '../../modules/module.inversify';
import { UsersController } from './users.controller';
import {UsersService} from './users.service';
import { BrokerModule } from '../broker/broker.module';
import {UsersFilter} from './users.filter';

@Module({
    imports: [
        BrokerModule
    ],
    services: [UsersService, UsersFilter],
    controllers: [UsersController]
})
export class UsersModule {}