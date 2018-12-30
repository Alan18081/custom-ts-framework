import { injectable, inject } from 'inversify';
import { ValidatorService, SubscribeMessage } from '@astra/common';
import {StorageDataService} from './storage-data.service';
import {CommunicationCodes} from '@astra/common';
import {CreateStorageDataDto} from './dto/create-storage-data.dto';

@injectable()
export class StorageDataHandler {

    @inject(ValidatorService)
    private readonly validatorService: ValidatorService;

    @inject(StorageDataService)
    private readonly storageDataService: StorageDataService;

    @SubscribeMessage(CommunicationCodes.CREATE_STORAGE_DATA)
    async createOne() {
        return await this.storageDataService.createOne();
    }

}
