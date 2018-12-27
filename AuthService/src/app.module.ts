import {Module} from '@astra/common';
import {AuthModule} from './components/auth/auth.module';

@Module({
  imports: [AuthModule],
})
export class AppModule {}