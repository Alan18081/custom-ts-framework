import { Module } from '../../lib/modules/module.inversify';
import {AuthHandler} from './auth.handler';
import {CoreModule} from '../core/core.module';
import { AuthService } from './auth.service';
import { AuthFilter } from './auth.filter';

@Module({
    imports: [CoreModule],
    services: [AuthService, AuthFilter],
    handlers: [AuthHandler]
})
export class AuthModule {}