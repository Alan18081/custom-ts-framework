import { config } from '../../config';
import { connect } from 'amqplib/channel_api';
import { Server } from './lib/server/server';
import { AppModule } from './app.module';
import { messageBroker } from './lib/broker/message-broker';

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
            await messageBroker.run(connection);
        } catch (e) {
            console.log('[AMQP] Failed to create connection: ', e.message);
        }
    }
}

new API(5000);

