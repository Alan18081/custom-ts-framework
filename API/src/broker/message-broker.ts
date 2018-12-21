import {Channel, Connection} from 'amqplib';

export const messageBroker = new class {
    private connection: Connection;
    public channel: Channel;

    private handleError(err) {
        console.log('[AMQP] Connection error: ', err);
    }

    private handleClose(err) {
        console.log('[AMQP] Connection closed: ', err);
    }

    async run(connection: any) {
        this.connection = connection;
        this.channel = await this.connection.createChannel();
        this.connection.on('error', this.handleError.bind(this));
        this.connection.on('close', this.handleClose.bind(this));
        console.log('[AMQP] Connection established');
    }
}