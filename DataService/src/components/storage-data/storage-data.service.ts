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

    async updateOne(id: number, data: object): Promise<StorageData | undefined> {
        console.log(id, data);
        return await this.storageDataRepository.updateOne({ storageId: id }, { $set: { data } });
    }

    async removeOne(id: number): Promise<void> {
        await this.storageDataRepository.delete({ storageId: id });
    }

}