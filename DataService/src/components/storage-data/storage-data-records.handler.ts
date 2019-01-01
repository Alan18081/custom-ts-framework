import { injectable, inject } from 'inversify';
import { CommunicationCodes, SubscribeMessage } from '@astra/common';
import * as uid from 'uid';
import {StorageData} from './storage-data';
import {AddRecordDto} from './dto/records/add-record.dto';
import {StorageDataService} from './storage-data.service';
import {RemoveRecordDto} from './dto/records/remove-record.dto';

@injectable()
export class StorageDataRecordsHandler {

    @inject(StorageDataService)
    private readonly storageDataService: StorageDataService;

    @SubscribeMessage(CommunicationCodes.SET_STORAGE_DATA_RECORD)
    async createOne(payload: AddRecordDto): Promise<StorageData> {
        const key = `data.${uid(10)}`;
        return await this.storageDataService.setOneRecord(payload.projectId, payload.path, key, payload.record);
    }

    @SubscribeMessage(CommunicationCodes.REMOVE_STORAGE_DATA)
    async removeOne(payload: RemoveRecordDto): Promise<StorageData> {
        const key = `data.${payload.path.join('.')}`;
        return await this.storageDataService.removeOneRecord(payload.storageId, key);
    }

}