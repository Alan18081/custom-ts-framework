import {Module} from '@astra/common';
import {PublicUserStoragesController} from './public-user-storages.controller';
import {AuthModule} from '../auth/auth.module';

@Module({
    imports: [AuthModule],
    controllers: [PublicUserStoragesController]
})
export class PublicUserStoragesModule {}