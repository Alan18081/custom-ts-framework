import { Module } from '@astra/common';
import {TokensService} from './services/tokens.service';
import {ValidatorService} from './services/validator.service';

@Module({
    services: [TokensService, ValidatorService]
})
export class CoreModule {}