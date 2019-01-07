import 'reflect-metadata';
import { connect } from 'amqplib';
import { messageBroker } from './helpers/message-broker';
import { cacheManager } from './helpers/cache-manager';
import {config} from '@astra/common';
import { AppModule } from './app.module';


class ProjectsService {

    private readonly appModule = new AppModule();

    constructor() {
        this.initBroker();
    }

    async initBroker() {
        try {
            const connection = await connect(config.rabbitmq.url);
            await Promise.all([
                messageBroker.run(connection),
                cacheManager.run()
            ]);
            console.log('ProjectsService is working');
        } catch (e) {
            console.log('[AMQP] Failed to create connection: ', e.message);
        }
    }
}

new ProjectsService();