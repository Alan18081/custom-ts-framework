import { Module } from '../../modules/module.inversify';
import {BrokerService} from './broker.service';

@Module({
    imports: [],
    services: [BrokerService]
})
export class BrokerModule {
    constructor() {
        console.log('Broker module created');
    }
}