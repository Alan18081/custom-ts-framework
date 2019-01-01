import { BaseRepository } from '@astra/common';
import {UserHash} from './user-hash';
import {db} from '../../helpers/db';
import {injectable} from 'inversify';

@injectable()
export class UserHashesRepository extends BaseRepository<UserHash> {

    constructor() {
        super(db, 'user_hashes', UserHash);
    }

}