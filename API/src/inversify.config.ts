import { Container } from 'inversify';
import { AppModule } from './app.module';

const globalContainer = new Container();

export { globalContainer };