import {Module} from '@astra/common';
import {AuthModule} from '../auth/auth.module';
import {ApiAuthController} from './api-auth.controller';

@Module({
    imports: [AuthModule],
    controllers: [ApiAuthController],
})
export class ApiAuthModule {}