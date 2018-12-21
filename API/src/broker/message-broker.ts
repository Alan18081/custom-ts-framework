export const messageBroker = new class {
    connection: any;

    private handleError(err) {
        console.log('[AMQP] Connection error: ', err);
    }

    private handleClose(err) {
        console.log('[AMQP] Connection closed: ', err);
    }

    run(connection: any) {
        this.connection = connection;
        this.connection.on('error', this.handleError.bind(this));
        this.connection.on('close', this.handleClose.bind(this));
        console.log('[AMQP] Connection established');
    }
}