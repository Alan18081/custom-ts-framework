import { Module } from '@astra/common';
import {ProjectAccountsHandler} from './project-accounts.handler';
import {ProjectAccountsService} from './project-accounts.service';
import {ProjectAccountsRepository} from './project-accounts.repository';
import {ProjectsModule} from '../projects/projects.module';

@Module({
    imports: [ProjectsModule],
    handlers: [ProjectAccountsHandler],
    services: [ProjectAccountsService, ProjectAccountsRepository]
})
export class ProjectAccountsModule {}