import {Module} from './lib/modules/module.inversify';
import {AuthModule} from './components/auth/auth.module';

@Module({
  imports: [AuthModule],
})
export class AppModule {}