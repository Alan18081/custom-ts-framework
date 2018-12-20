import { MessageBroker } from '../../broker/message-broker';
import { Module } from '../../modules/module.inversify';

@Module({
    imports: [],
    services: [MessageBroker]
})
export class BrokerModule {
    constructor() {
        console.log('Broker module created');
    }
}