import {Module} from '@astra/common';
import {injectable} from 'inversify';
import {ProjectsService} from './projects.service';
import {ProjectsHandler} from './projects.handler';
import {CoreModule} from '../core/core.module';

@Module({
    imports: [CoreModule],
    services: [ProjectsService],
    handlers: [ProjectsHandler]
})
@injectable()
export class ProjectsModule {}