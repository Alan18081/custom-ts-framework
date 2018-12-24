import {Module} from '../../lib/modules/module.inversify';
import { UsersController } from './users.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [AuthModule],
    controllers: [UsersController]
})
export class UsersModule {}