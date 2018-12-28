import { Module, ValidatorService } from '@astra/common';
import {TokensService} from './services/tokens.service';

@Module({
    services: [TokensService, ValidatorService]
})
export class CoreModule {}