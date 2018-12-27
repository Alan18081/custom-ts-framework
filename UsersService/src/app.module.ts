import {Module} from '@astra/common';
import {UsersModule} from './components/users/users.module';

@Module({
  imports: [UsersModule],
})
export class AppModule {}