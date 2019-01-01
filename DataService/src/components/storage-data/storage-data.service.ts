import { injectable, inject } from 'inversify';
import {StorageData} from './storage-data';
import {StorageDataRepository} from './storage-data.repository';
import {CreateStorageDataDto} from './dto/storage/create-storage-data.dto';

@injectable()
export class StorageDataService {

    @inject(StorageDataRepository)
    private readonly storageDataRepository: StorageDataRepository;

    async findOneByStorageId(id: number): Promise<StorageData | undefined> {
        return await this.storageDataRepository.findOne({ storageId: id });
    }

    async createOne(payload: CreateStorageDataDto): Promise<StorageData> {
        const newStorage = new StorageData(payload);

        return await this.storageDataRepository.save(newStorage);
    }

    async updateOne(id: number, data: Partial<StorageData>): Promise<StorageData | undefined> {
        return await this.storageDataRepository.updateOne({ storageId: id }, { $set: { data: data } });
    }

    async removeOne(id: number): Promise<void> {
        await this.storageDataRepository.delete({ storageId: id });
    }

    async setOneRecord(projectId: number, path: string, key: string, data: any): Promise<StorageData> {
        const updatedData = await this.storageDataRepository.updateOne({ projectId, path }, { $set: { key: data } });
        return updatedData;
    }

    async removeOneRecord(storageId: number, key: string): Promise<StorageData> {
        return await this.storageDataRepository.updateOne({ storageId }, { $unset: { key: null } });
    }

}