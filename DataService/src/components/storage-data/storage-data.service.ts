import { injectable, inject } from 'inversify';
import {StorageData} from './storage-data';
import {StorageDataRepository} from './storage-data.repository';

@injectable()
export class StorageDataService {

    @inject(StorageDataRepository)
    private readonly storageDataRepository: StorageDataRepository;

    async createOne(): Promise<StorageData> {
        const newStorage = new StorageData({});

        return await this.storageDataRepository.save(newStorage);
    }

}