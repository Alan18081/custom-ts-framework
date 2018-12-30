import { injectable } from 'inversify';
import { MongoRepository } from '../../helpers/mongo.repository';
import { client } from '../../helpers/mongo-db';
import { StorageData } from './storage-data';

@injectable()
export class StorageDataRepository extends MongoRepository<StorageData> {

    constructor() {
        super(client, 'storage-data', StorageData);
    }

}