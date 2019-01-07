import {Module} from '@astra/common';
import { ProjectsModule } from './components/projects/projects.module';
import { StoragesModule } from './components/storages/storages.module';
import {ProjectAccountsModule} from './components/project-accounts/project-accounts.module';

@Module({
  imports: [
      ProjectsModule,
      StoragesModule,
      ProjectAccountsModule,
  ],
})
export class AppModule {}