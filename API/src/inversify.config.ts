import { Container } from 'inversify';
import { AppModule } from './app.module';
import { MessageBroker } from './broker/message-broker';

export const globalContainer = new Container();

globalContainer.bind(AppModule).to(AppModule);
// globalContainer.bind(MessageBroker).to(MessageBroker);

