import 'reflect-metadata';
import { connect } from 'amqplib';
import { messageBroker } from './lib/broker/message-broker';
import {RABBITMQ_URL} from './config';
import { AppModule } from './app.module';

class AuthService {

    private readonly appModule = new AppModule();

    constructor() {
        this.initBroker();
    }

    async initBroker() {
        try {
            const connection = await connect(RABBITMQ_URL);
            await messageBroker.run(connection);
        } catch (e) {
            console.log('[AMQP] Failed to create connection: ', e.message);
        }
    }
}

new AuthService();