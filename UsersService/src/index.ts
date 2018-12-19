import 'reflect-metadata';
import { AppModule } from './app.module';
import { Server } from './common/server/server';

const appModule = new AppModule();

const server = new Server(5000);

server.run();