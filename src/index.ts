import 'reflect-metadata';
import { AppModule } from './app.module';
import { Server } from './lib/server/server';
import {db} from './lib/models/knex';

const appModule = new AppModule();


const server = new Server(5000);

server.run();