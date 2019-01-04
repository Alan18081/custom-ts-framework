import {Module} from '@astra/common';
import {AuthModule} from '../auth/auth.module';

@Module({
    imports: [AuthModule],
    controllers: [],
})
export class ApiAuthModule {}