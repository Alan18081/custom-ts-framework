import { injectable } from 'inversify';
import {Module} from '@astra/common';
import {UsersModule} from './components/users/users.module';
import { AuthModule } from './components/auth/auth.module';
import { ProjectsModule } from './components/projects/projects.module';
import { StoragesModule } from './components/storages/storages.module';
import { PaymentsModule } from './components/payments/payments.module';

@Module({
    imports: [
      UsersModule,
      AuthModule,
      ProjectsModule,
      StoragesModule,
      PaymentsModule
    ],
})
@injectable()
export class AppModule {}