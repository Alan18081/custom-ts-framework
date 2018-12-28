import {Module} from '@astra/common';
import { ProjectsModule } from './components/projects/projects.module';
import { StoragesModule } from './components/storages/storages.module';

@Module({
  imports: [ProjectsModule, StoragesModule],
})
export class AppModule {}