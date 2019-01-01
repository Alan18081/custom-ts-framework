import { Module } from '@astra/common';
import {CoreModule} from '../core/core.module';
import {StorageDataService} from './storage-data.service';
import {StorageDataRepository} from './storage-data.repository';
import {StorageDataHandler} from './storage-data.handler';
import {StorageDataRecordsHandler} from './storage-data-records.handler';

@Module({
    imports: [CoreModule],
    services: [StorageDataService, StorageDataRepository],
    handlers: [StorageDataHandler, StorageDataRecordsHandler]
})
export class StorageDataModule {}