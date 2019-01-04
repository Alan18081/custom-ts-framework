import { injectable, inject } from 'inversify';
import * as uid from 'uid';
import { ValidatorService, SubscribeMessage, Messages, BadRequest, PaginatedResponse } from '@astra/common';
import {StorageRecordsService} from './storage-records.service';
import {CommunicationCodes} from '@astra/common';
import {StorageRecord} from './storage-record';
import { FindRecordsListDto } from './dto/find-records-list.dto';
import { AddRecordDto } from './dto/add-record.dto';
import { RemoveRecordDto } from './dto/remove-record.dto';
import { GetRecordDto } from './dto/get-record.dto';
import {UpdateRecordDto} from './dto/update-record.dto';

@injectable()
export class StorageRecordsHandler {

    @inject(ValidatorService)
    private readonly validatorService: ValidatorService;

    @inject(StorageRecordsService)
    private readonly storageRecordsService: StorageRecordsService;

    @SubscribeMessage(CommunicationCodes.GET_STORAGE_RECORDS_LIST)
    async findMany(payload: FindRecordsListDto): Promise<StorageRecord[] | PaginatedResponse<StorageRecord>> {
        await this.validatorService.validate(payload, FindRecordsListDto);

        if(payload.page && payload.limit) {
            const { page, limit, ...data } = payload;
            return this.storageRecordsService.findManyWithPagination(payload, { page, limit });
        }

        return this.storageRecordsService.findMany(payload);
    }

    @SubscribeMessage(CommunicationCodes.GET_STORAGE)
    async findOne(payload: GetRecordDto): Promise<StorageRecord | undefined> {
        await this.validatorService.validate(payload, GetRecordDto);

        return await this.storageRecordsService.findOneById(payload.id);
    }

    @SubscribeMessage(CommunicationCodes.CREATE_STORAGE_RECORD)
    async createOne(payload: AddRecordDto): Promise<StorageRecord> {
        await this.validatorService.validate(payload, AddRecordDto);

        return await this.storageRecordsService.createOne(payload);
    }

    @SubscribeMessage(CommunicationCodes.UPDATE_STORAGE_RECORD)
    async updateOne(payload: UpdateRecordDto): Promise<StorageRecord | undefined> {
        await this.validatorService.validate(payload, UpdateRecordDto);

        return await this.storageRecordsService.updateOne(payload);
    }

    @SubscribeMessage(CommunicationCodes.REMOVE_STORAGE_RECORD)
    async removeOne(payload: RemoveRecordDto): Promise<void> {
        await this.validatorService.validate(payload, RemoveRecordDto);

        await this.storageRecordsService.removeOne(payload.recordId);
    }

}
