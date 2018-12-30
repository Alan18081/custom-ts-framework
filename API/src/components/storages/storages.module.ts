import {Module} from '@astra/common';
import {injectable} from 'inversify';
import {StoragesController} from './storages.controller';
import {AuthModule} from '../auth/auth.module';

@Module({
    imports: [AuthModule],
    controllers: [StoragesController]
})
@injectable()
export class StoragesModule {}