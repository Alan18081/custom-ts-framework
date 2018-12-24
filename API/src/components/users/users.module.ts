import {Module} from '../../lib/modules/module.inversify';
import { UsersController } from './users.controller';

@Module({
    controllers: [UsersController]
})
export class UsersModule {}