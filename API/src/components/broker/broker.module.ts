import { Module } from '../../lib/modules/module.inversify';
import { BrokerService } from './broker.service';

@Module({
  services: [{ type: BrokerService, value: new BrokerService() }]
})
export class BrokerModule {}