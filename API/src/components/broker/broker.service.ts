import { injectable } from 'inversify';

@injectable()
export class BrokerService {
  constructor() {
    console.log('BrokerService created');
  }
}