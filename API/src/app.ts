import { config } from '../../config';
import { connect } from 'amqplib';
import {MessageBroker} from '../../Common/broker/message-broker';
import { Server } from '../../Common/server/server';

class API {

    private messageBroker: MessageBroker;
    private server: Server;

    constructor(port: number) {
        this.server = new Server(port);
        this.initBroker();
        this.server.run();
    }

    async initBroker() {
        const connection = await connect(config.rabbitmq.url);
        this.messageBroker = new MessageBroker(connection);
    }
}

new API(5000);

