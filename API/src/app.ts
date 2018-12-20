import { config } from '../../config';
import { connect } from 'amqplib';
import {MessageBroker} from '../../Common/broker/message-broker';
import { Server } from './server/server';
import { AppModule } from './app.module';

class API {

    private readonly server: Server;
    private readonly appModule: AppModule;

    constructor(port: number) {
        this.appModule = new AppModule();
        this.server = new Server(port);
        this.initBroker();
        this.server.run();
    }

    async initBroker() {
        try {
            const connection = await connect(config.rabbitmq.url);
        } catch (e) {
          console.log('[AMQP] Failed to create connection: ', e.message);
        }
    }
}

new API(5000);

