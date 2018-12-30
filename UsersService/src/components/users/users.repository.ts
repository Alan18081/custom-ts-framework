import { BaseRepository } from '../../../../Common/src/models';
import {User} from './user';
import {db} from '../../helpers/db';
import {injectable, } from 'inversify';

@injectable()
export class UsersRepository extends BaseRepository<User> {

    constructor() {
        super(db, 'users', User);
    }

}