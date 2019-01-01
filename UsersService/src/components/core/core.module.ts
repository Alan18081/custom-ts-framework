import { Module, ValidatorService, HashService } from '@astra/common';

@Module({
    services: [HashService, ValidatorService]
})
export class CoreModule {}