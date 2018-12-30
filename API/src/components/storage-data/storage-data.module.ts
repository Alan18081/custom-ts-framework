import {Module} from '@astra/common';
import {AuthModule} from '../auth/auth.module';
import {StorageDataController} from './storage-data.controller';

@Module({
  imports: [AuthModule],
  controllers: [StorageDataController]
})
export class StorageDataModule {}