import { injectable } from 'inversify';
import {Module} from '@astra/common';
import {UsersModule} from './components/users/users.module';
import { AuthModule } from './components/auth/auth.module';

@Module({
    imports: [
      UsersModule,
      AuthModule,
    ],
    services: [],
    controllers: [],
    exports: [],
})
@injectable()
export class AppModule {}