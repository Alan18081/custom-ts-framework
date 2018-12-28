import {Module} from '@astra/common';
import {injectable} from 'inversify';
import { ProjectsController } from './projects.controller';

@Module({
    controllers: [ProjectsController]
})
@injectable()
export class ProjectsModule {}