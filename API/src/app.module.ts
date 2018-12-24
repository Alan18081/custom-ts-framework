import { inject, injectable } from 'inversify';
import {Module} from './lib/modules/module.inversify';
import {UsersModule} from './components/users/users.module';
import { AuthModule } from './components/auth/auth.module';
import { BrokerModule } from './components/broker/broker.module';

@Module({
    imports: [
      UsersModule,
      AuthModule,
      BrokerModule
    ],
    services: [],
    controllers: [],
    exports: [],
})
@injectable()
export class AppModule {}