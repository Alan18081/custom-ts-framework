import {Module} from '@astra/common';
import {ApiStoragesController} from './api-storages.controller';
import {AuthModule} from '../auth/auth.module';

@Module({
    imports: [AuthModule],
    controllers: [ApiStoragesController]
})
export class ApiStoragesModule {}