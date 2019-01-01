import 'reflect-metadata';
import { connect } from 'amqplib';
import { messageBroker } from './helpers/message-broker';
import {config} from '@astra/common';
import { AppModule } from './app.module';
import { client } from './helpers/mongo-db';

class DataService {

    private app: AppModule;

    constructor() {
        this.initBroker();
        this.initDb();
    }

    async initBroker() {
        try {
            const connection = await connect(config.rabbitmq.url);
            await messageBroker.run(connection);
            console.log('DataService is working');
        } catch (e) {
            console.log('[AMQP] Failed to create connection: ', e.message);
        }
    }

    async initDb() {
        try {
            await client.connect();
            this.app = new AppModule();
        } catch (e) {
            console.log('[MongoDB] Failed to connect');
        }
    }
}

new DataService();