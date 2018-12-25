import { Module } from '@astra/common';
import {PasswordsService} from './services/passwords.service';
import {ValidatorService} from './services/validator.service';

@Module({
    services: [PasswordsService, ValidatorService]
})
export class CoreModule {}