import { injectable, inject } from 'inversify';
import { CommunicationCodes, SubscribeMessage } from '@astra/common';
import * as uid from 'uid';
import {StorageData} from './storage-data';
import {AddRecordDto} from './dto/records/add-record.dto';
import {StorageDataService} from './storage-data.service';
import {RemoveRecordDto} from './dto/records/remove-record.dto';
import {FindStorageRecordsListDto} from './dto/records/find-storage-records-list.dto';

@injectable()
export class StorageDataRecordsHandler {

    @inject(StorageDataService)
    private readonly storageDataService: StorageDataService;

    @SubscribeMessage(CommunicationCodes.GET_STORAGE_RECORDS_LIST)
    async findMany(payload: FindStorageRecordsListDto): Promise<StorageData[]> {
        return this.storageDataService.findOne(payload.projectId, payload.path);
    }

    @SubscribeMessage(CommunicationCodes.SET_STORAGE_RECORD)
    async createOne(payload: AddRecordDto): Promise<StorageData> {
        const key = `data.${uid(10)}`;
        return await this.storageDataService.setOneRecord(payload.projectId, payload.path, key, payload.record);
    }

    @SubscribeMessage(CommunicationCodes.REMOVE_STORAGE_RECORD)
    async removeOne(payload: RemoveRecordDto): Promise<StorageData> {
        const key = `data.${payload.path.join('.')}`;
        return await this.storageDataService.removeOneRecord(payload.storageId, key);
    }

}