import { injectable } from 'inversify';
import { MongoRepository } from '../../helpers/mongo.repository';
import { client } from '../../helpers/mongo-db';
import { StorageRecord } from './storage-record';

@injectable()
export class StorageRecordsRepository extends MongoRepository<StorageRecord> {

    constructor() {
        super(client, 'storage-data', StorageRecord);
    }

}