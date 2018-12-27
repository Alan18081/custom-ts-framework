import { Module, ValidatorService } from '@astra/common';
import {PasswordsService} from './services/passwords.service';

@Module({
    services: [PasswordsService, ValidatorService]
})
export class CoreModule {}