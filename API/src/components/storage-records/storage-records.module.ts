import { Module } from '@astra/common';
import { StorageRecordsController } from './storage-records.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [StorageRecordsController]
})
export class StorageRecordsModule {}