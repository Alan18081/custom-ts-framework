import { injectable, inject } from 'inversify';
import * as uid from 'uid';
import { SubscribeMessage, Messages, BadRequest, PaginatedResponse, Validate } from '@astra/common';
import {StorageRecordsService} from './storage-records.service';
import {CommunicationCodes} from '@astra/common';
import {StorageRecord} from './storage-record';
import { FindRecordsListDto } from './dto/find-records-list.dto';
import { AddRecordDto } from './dto/add-record.dto';
import { RemoveRecordDto } from './dto/remove-record.dto';
import { FindRecordDto } from './dto/find-record.dto';
import {UpdateRecordDto} from './dto/update-record.dto';

@injectable()
export class StorageRecordsHandler {

    @inject(StorageRecordsService)
    private readonly storageRecordsService: StorageRecordsService;

    @SubscribeMessage(CommunicationCodes.GET_STORAGE_RECORDS_LIST)
    @Validate(FindRecordsListDto)
    async findMany(payload: FindRecordsListDto): Promise<StorageRecord[] | PaginatedResponse<StorageRecord>> {
        if(payload.page && payload.limit) {
            const { page, limit, ...data } = payload;
            return this.storageRecordsService.findManyWithPagination(data, { page, limit });
        }

        return this.storageRecordsService.findMany(payload);
    }

    @SubscribeMessage(CommunicationCodes.GET_STORAGE_RECORD)
    @Validate(FindRecordDto)
    async findOne(payload: FindRecordDto): Promise<StorageRecord | undefined> {
        return await this.storageRecordsService.findOneById(payload.id);
    }

    @SubscribeMessage(CommunicationCodes.CREATE_STORAGE_RECORD)
    @Validate(AddRecordDto)
    async createOne(payload: AddRecordDto): Promise<StorageRecord> {
        return await this.storageRecordsService.createOne(payload);
    }

    @SubscribeMessage(CommunicationCodes.UPDATE_STORAGE_RECORD)
    @Validate(UpdateRecordDto)
    async updateOne(payload: UpdateRecordDto): Promise<StorageRecord | undefined> {
        return await this.storageRecordsService.updateOne(payload);
    }

    @SubscribeMessage(CommunicationCodes.REMOVE_STORAGE_RECORD)
    @Validate(RemoveRecordDto)
    async removeOne(payload: RemoveRecordDto): Promise<void> {
        await this.storageRecordsService.removeOne(payload.id);
    }

}
