import {Module} from '@astra/common';
import {injectable} from 'inversify';
import { ProjectsController } from './projects.controller';
import {AuthModule} from '../auth/auth.module';

@Module({
    imports: [AuthModule],
    controllers: [ProjectsController]
})
@injectable()
export class ProjectsModule {}