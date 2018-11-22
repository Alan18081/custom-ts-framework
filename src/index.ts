import 'reflect-metadata';
import { UsersModule } from './users/users.module';
import { Server } from './server/server';
import {MODULE_KEYS} from './server';
import {AuthModule} from './auth/auth.module';

const userModule = new UsersModule();

const server = new Server(4000);

server.run();

// console.log(Reflect.getMetadata(MODULE_KEYS.exports, AuthModule));