import { injectable, inject } from 'inversify';
import { PaginationDto } from '@astra/common';
import { StorageRecordsRepository } from './storage-records.repository';
import { StorageRecord } from './storage-record';
import { FindRecordsListDto } from './dto/find-records-list.dto';
import {UpdateRecordDto} from './dto/update-record.dto';
import {PaginatedResponse} from '../../../../Common/dist/interfaces';

@injectable()
export class StorageRecordsService {

    @inject(StorageRecordsRepository)
    private readonly storageRecordsRepository: StorageRecordsRepository;

    async findOneById(id: string): Promise<StorageRecord> {
        return await this.storageRecordsRepository.findById(id);
    }

    async findMany(query: FindRecordsListDto): Promise<StorageRecord[]> {
        return await this.storageRecordsRepository.find(query);
    }

    async findManyWithPagination(query: FindRecordsListDto, pagination: Required<PaginationDto>): Promise<PaginatedResponse<StorageRecord>> {
        return await this.storageRecordsRepository.findManyWithPagination(query, pagination);
    }

    async updateOne({ data, id }: UpdateRecordDto): Promise<StorageRecord | undefined> {
      return await this.storageRecordsRepository.updateById(id, { $set: { data } });
    }

    async createOne(payload: Partial<StorageRecord>): Promise<StorageRecord> {
        const newStorageRecord = new StorageRecord({...payload});

        return await this.storageRecordsRepository.save(newStorageRecord);
    }

    async removeOne(recordId: string): Promise<void> {
        await this.storageRecordsRepository.deleteById(recordId);
    }

}