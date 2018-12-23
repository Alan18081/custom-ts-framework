import {Module} from './lib/modules/module.inversify';
import {UsersModule} from './components/users/users.module';
import {injectable} from 'inversify';

@Module({
    imports: [
        UsersModule,
    ],
    services: [],
    controllers: [],
    exports: [],
})
@injectable()
export class AppModule {}