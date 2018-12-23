import { Module } from '../../lib/modules/module.inversify';
import {PasswordsService} from './services/passwords.service';

@Module({
    services: [PasswordsService]
})
export class CoreModule {}