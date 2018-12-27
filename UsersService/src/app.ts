import 'reflect-metadata';
import { config } from '@astra/common';
import { connect } from 'amqplib';
import { messageBroker } from './helpers/message-broker';
import { AppModule } from './app.module';

class UsersService {

    private readonly appModule = new AppModule();

    constructor() {
        this.initBroker();
    }

    async initBroker() {
        try {
            const connection = await connect(config.rabbitmq.url);
            await messageBroker.run(connection);
            console.log('UsersService is working');
        } catch (e) {
            console.log('[AMQP] Failed to create connection: ', e.message);
        }
    }
}

new UsersService();