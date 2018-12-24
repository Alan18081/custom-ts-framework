import {Module} from './lib/modules/module.inversify';
import {UsersModule} from './components/users/users.module';

@Module({
  imports: [UsersModule],
})
export class AppModule {}