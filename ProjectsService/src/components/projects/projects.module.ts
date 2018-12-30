import {Module} from '@astra/common';
import {injectable} from 'inversify';
import {ProjectsService} from './projects.service';
import {ProjectsHandler} from './projects.handler';
import {CoreModule} from '../core/core.module';
import {ProjectsRepository} from './projects.repository';

@Module({
    imports: [CoreModule],
    services: [ProjectsService, ProjectsRepository],
    handlers: [ProjectsHandler]
})
@injectable()
export class ProjectsModule {}