import { injectable, inject } from 'inversify';
import { ValidatorService, SubscribeMessage, Messages, BadRequest } from '@astra/common';
import {StorageDataService} from './storage-data.service';
import {CommunicationCodes} from '@astra/common';
import {CreateStorageDataDto} from './dto/storage/create-storage-data.dto';
import {UpdateStorageDataDto} from './dto/storage/update-storage-data.dto';
import {StorageData} from './storage-data';
import {RemoveStorageDataDto} from './dto/storage/remove-storage-data.dto';
import {FindStorageDataDto} from './dto/storage/find-storage-data.dto';

@injectable()
export class StorageDataHandler {

    @inject(ValidatorService)
    private readonly validatorService: ValidatorService;

    @inject(StorageDataService)
    private readonly storageDataService: StorageDataService;

    @SubscribeMessage(CommunicationCodes.GET_STORAGE_DATA_BY_STORAGE)
    async findOne(payload: FindStorageDataDto): Promise<StorageData | undefined> {
        return await this.storageDataService.findOneByStorageId(payload.storageId);
    }

    @SubscribeMessage(CommunicationCodes.CREATE_STORAGE_DATA)
    async createOne(payload: CreateStorageDataDto): Promise<StorageData> {
        await this.validatorService.validate(payload, CreateStorageDataDto);

        const storageData = await this.storageDataService.findOneByStorageId(payload.storageId);
        if(storageData) {
            throw new BadRequest({ error: Messages.STORAGE_DATA_ALREADY_EXISTS });
        }

        return await this.storageDataService.createOne(payload);
    }

    @SubscribeMessage(CommunicationCodes.UPDATE_STORAGE_DATA)
    async updateOne(payload: UpdateStorageDataDto): Promise<StorageData | undefined> {
        await this.validatorService.validate(payload, UpdateStorageDataDto);

        return await this.storageDataService.updateOne(payload.id, payload.data);
    }

    @SubscribeMessage(CommunicationCodes.REMOVE_STORAGE_DATA)
    async removeOne(payload: RemoveStorageDataDto): Promise<void> {
        console.log(payload.storageId);
        await this.storageDataService.removeOne(payload.storageId);
    }




}
