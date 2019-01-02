import { Module } from '@astra/common';
import {CoreModule} from '../core/core.module';
import { StorageRecordsService } from './storage-records.service';
import { StorageRecordsHandler } from './storage-records.handler';
import { StorageRecordsRepository } from './storage-records.repository';

@Module({
    imports: [CoreModule],
    services: [StorageRecordsService, StorageRecordsRepository],
    handlers: [StorageRecordsHandler]
})
export class StorageRecordsModule {}