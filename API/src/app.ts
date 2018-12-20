import { config } from '../../config';
import { connect } from 'amqplib';
import { Server } from './server/server';
import { globalContainer } from './inversify.config';
import { AppModule } from './app.module';
import { MessageBroker } from './broker/message-broker';

class API {

    private readonly server: Server;
    private readonly appModule: AppModule;

    constructor(port: number) {
        this.appModule = globalContainer.get<AppModule>(AppModule);
        this.server = new Server(port);
        this.server.run();
    }

    // async initBroker() {
    //     try {
    //         const connection = await connect(config.rabbitmq.url);
    //         const messageBroker = globalContainer.get<MessageBroker>(MessageBroker);
    //         messageBroker.run(connection);
    //     } catch (e) {
    //       console.log('[AMQP] Failed to create connection: ', e.message);
    //     }
    // }
}

new API(5000);

