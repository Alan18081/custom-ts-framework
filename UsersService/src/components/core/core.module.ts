import { Module } from '@astra/common';
import {PasswordsService} from './services/passwords.service';
import { ValidatorService } from '@astra/common';

@Module({
    services: [PasswordsService, ValidatorService]
})
export class CoreModule {}