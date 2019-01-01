import { config, Server } from '@astra/common';
import { connect } from 'amqplib/channel_api';
import { AppModule } from './app.module';
import { messageBroker } from './helpers/message-broker';

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
            const connection = await connect(config.rabbitmq.url, {  });
            await messageBroker.run(connection);
            console.log('API is working');
        } catch (e) {
            console.log('[AMQP] Failed to create connection: ', e.message);
        }
    }
}

new API(5000);

