import {Module} from './lib/modules/module.inversify';

@Module({
  imports: [UsersModule],
})
export class AppModule {}