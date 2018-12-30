import { BaseRepository } from '@astra/common';
import {Project} from './project';
import {db} from '../../helpers/db';

export class ProjectsRepository extends BaseRepository<Project> {

    constructor() {
        super(db, 'projects', Project);
    }

}