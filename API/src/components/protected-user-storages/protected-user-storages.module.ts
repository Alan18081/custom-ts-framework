import {Module} from '@astra/common';
import {ProtectedUserStoragesController} from './protected-user-storages.controller';
import {AuthModule} from '../auth/auth.module';

@Module({
    imports: [AuthModule],
    controllers: [ProtectedUserStoragesController]
})
export class ProtectedUserStoragesModule {}