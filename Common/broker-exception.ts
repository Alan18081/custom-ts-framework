import {CommunicationErrors} from './communication-errors';

export class BrokerException {
    constructor(
       public readonly message: CommunicationErrors,
    ) {}
}