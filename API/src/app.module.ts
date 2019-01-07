import { injectable } from 'inversify';
import {Module} from '@astra/common';
import {UsersModule} from './components/users/users.module';
import { AuthModule } from './components/auth/auth.module';
import { ProjectsModule } from './components/projects/projects.module';
import { StoragesModule } from './components/storages/storages.module';
import { PaymentsModule } from './components/payments/payments.module';
import {ProtectedUserStoragesModule} from './components/protected-user-storages/protected-user-storages.module';
import { PublicUserStoragesModule } from './components/public-user-storages/public-user-storages.module';
import {ApiAuthModule} from './components/api-auth/api-auth.module';
import {ProjectAccountsModule} from './components/project-accounts/project-accounts.module';

@Module({
    imports: [
      UsersModule,
      AuthModule,
      ProjectsModule,
      ProjectAccountsModule,
      StoragesModule,
      PaymentsModule,
      PublicUserStoragesModule,
      ProtectedUserStoragesModule,
      ApiAuthModule,
    ],
})
@injectable()
export class AppModule {}

