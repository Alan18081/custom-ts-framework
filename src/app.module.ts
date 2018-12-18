import {Module} from './module';
import {AuthModule} from './components/auth/auth.module';
import {UsersModule} from './components/users/users.module';

@Module({
  imports: [UsersModule],
})
export class AppModule {}