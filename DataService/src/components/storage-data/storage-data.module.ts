import { Module } from '@astra/common';
import {CoreModule} from '../core/core.module';
import {StorageDataService} from './storage-data.service';
import {StorageDataRepository} from './storage-data.repository';
import {StorageDataHandler} from './storage-data.handler';

@Module({
    imports: [CoreModule],
    services: [StorageDataService, StorageDataRepository],
    handlers: [StorageDataHandler]
})
export class StorageDataModule {}