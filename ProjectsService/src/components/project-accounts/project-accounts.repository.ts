import { injectable } from 'inversify';
import { BaseRepository } from '@astra/common';
import {ProjectAccount} from './project-account';
import { db } from '../../helpers/db';

@injectable()
export class ProjectAccountsRepository extends BaseRepository<ProjectAccount> {

    constructor() {
        super(db, 'project_accounts', ProjectAccount);
    }

}