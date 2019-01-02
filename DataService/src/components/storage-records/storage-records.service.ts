import { injectable, inject } from 'inversify';
import { StorageRecordsRepository } from './storage-records.repository';
import { StorageRecord } from './storage-record';
import { FindRecordsListDto } from './dto/find-records-list.dto';

@injectable()
export class StorageRecordsService {

    @inject(StorageRecordsRepository)
    private readonly storageRecordsRepository: StorageRecordsRepository;

    async findOneById(id: string): Promise<StorageRecord> {
        return await this.storageRecordsRepository.findById(id);
    }

    async findMany(query: FindRecordsListDto): Promise<StorageRecord[]> {
        console.log('Query', query);
        return await this.storageRecordsRepository.find(query);
    }

    async updateOne(id: number, data: Partial<StorageRecord>): Promise<StorageRecord | undefined> {
        return await this.storageRecordsRepository.updateOne({ storageId: id }, { $set: { data: data } });
    }

    async createOne(payload: Partial<StorageRecord>): Promise<StorageRecord> {
        const newStorageRecord = new StorageRecord({...payload});

        return await this.storageRecordsRepository.save(newStorageRecord);
    }

    async removeOne(recordId: string): Promise<void> {
        await this.storageRecordsRepository.deleteById(recordId);
    }

}