import {inject, injectable} from 'inversify';
import { MessageBroker } from '../../broker/message-broker';

@injectable()
export class UsersService {

    @inject(MessageBroker) messageBroker: MessageBroker;

    createUser() {
        console.log(this.messageBroker.connection);
        console.log('Hello from create user');
    }

}