import {Module} from './modules/module';
import {UsersModule} from './components/users/users.module';
import { MessageBroker } from '../../Common/broker/message-broker';

@Module({
    imports: [
        UsersModule
    ],
    controllers: [],
    services: [
        MessageBroker
    ],
    exports: [],
})
export class AppModule {}