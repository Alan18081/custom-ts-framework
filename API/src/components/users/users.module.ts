import {Module} from '@astra/common';
import { UsersController } from './users.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [AuthModule],
    controllers: [UsersController]
})
export class UsersModule {}