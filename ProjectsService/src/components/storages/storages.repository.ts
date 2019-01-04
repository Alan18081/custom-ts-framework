import {BaseRepository, PaginatedResponse} from '@astra/common';
import { injectable } from 'inversify';
import {Storage} from './storage';
import {db} from '../../helpers/db';

@injectable()
export class StoragesRepository extends BaseRepository<Storage> {

    constructor() {
        super(db, 'storages', Storage);
    }


}