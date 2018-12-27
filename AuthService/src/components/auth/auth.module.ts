import { Module } from '@astra/common'
import {AuthHandler} from './auth.handler';
import {CoreModule} from '../core/core.module';
import { AuthService } from './auth.service';

@Module({
    imports: [CoreModule],
    services: [AuthService],
    handlers: [AuthHandler]
})
export class AuthModule {}