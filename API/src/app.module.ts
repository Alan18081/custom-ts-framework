import {Module} from './modules/module.inversify';
import {UsersModule} from './components/users/users.module';
import {inject, injectable} from 'inversify';
import {config} from '../../config';
import {connect} from 'amqplib';
import {BrokerModule} from './components/broker/broker.module';

@Module({
    imports: [
        BrokerModule,
        UsersModule,
    ],
    services: [],
    controllers: [],
    exports: [],
})
@injectable()
export class AppModule {
    // @inject(UsersService) usersService: UsersService;
    //
    // constructor() {
    //     this.initBroker();
    // }
    //
    // async initBroker(): Promise<void> {
    //     try {
    //         const connection = await connect(config.rabbitmq.url);
    //         this.messageBroker.run(connection);
    //     } catch (e) {
    //         console.log('[AMQP] Failed to create connection: ', e.message);
    //     }
    //
    // }
}