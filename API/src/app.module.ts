import {Module} from './modules/module.inversify';
import {UsersModule} from './components/users/users.module';
import { MessageBroker } from './broker/message-broker';
import {inject, injectable} from 'inversify';
import {config} from '../../config';
import {connect} from 'amqplib';
import {BrokerModule} from './components/broker/broker.module';

@Module({
    imports: [
        BrokerModule,
        UsersModule,
    ],
    controllers: [],
    exports: [],
})
@injectable()
export class AppModule {
    // @inject(MessageBroker) messageBroker: MessageBroker;
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