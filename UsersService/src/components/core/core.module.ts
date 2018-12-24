import { Module } from '../../lib/modules/module.inversify';
import {PasswordsService} from './services/passwords.service';
import {ValidatorService} from './services/validator.service';

@Module({
    services: [PasswordsService, ValidatorService]
})
export class CoreModule {}