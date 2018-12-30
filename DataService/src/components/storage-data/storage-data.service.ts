import { injectable, inject } from 'inversify';
import {StorageData} from './storage-data';
import {StorageDataRepository} from './storage-data.repository';
import {CreateStorageDataDto} from './dto/create-storage-data.dto';

@injectable()
export class StorageDataService {

    @inject(StorageDataRepository)
    private readonly storageDataRepository: StorageDataRepository;

    async findOne(id: string): Promise<StorageData | undefined> {
        return await this.storageDataRepository.findOne({ _id: id });
    }

    async findOneByStorageId(id: number): Promise<StorageData | undefined> {
        return await this.storageDataRepository.findOne({ storageId: id });
    }

    async createOne(payload: CreateStorageDataDto): Promise<StorageData> {
        const newStorage = new StorageData(payload);

        return await this.storageDataRepository.save(newStorage);
    }

    async updateOne(id: string, data: object): Promise<StorageData | undefined> {
        return await this.storageDataRepository.updateOne({ _id: id }, data);
    }

    async removeOne(id: string): Promise<void> {
        await this.storageDataRepository.delete({ _id: id });
    }

}