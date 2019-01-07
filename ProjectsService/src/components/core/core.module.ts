import { Module, ValidatorService, HashService } from '@astra/common';
import {TokensService} from './services/tokens.service';

@Module({
    services: [TokensService, ValidatorService, HashService]
})
export class CoreModule {}