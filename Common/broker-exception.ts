import {Messages} from './messages';

export class BrokerException {
    constructor(
       public readonly message: Messages,
    ) {}
}