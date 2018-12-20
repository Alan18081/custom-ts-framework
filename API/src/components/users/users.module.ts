import {Module} from '../../modules/module.inversify';
import { UsersController } from './users.controller';
import {UsersService} from './users.service';
import { BrokerModule } from '../broker/broker.module';

@Module({
    imports: [
        BrokerModule
    ],
    services: [UsersService],
    controllers: [UsersController]
})
export class UsersModule {}