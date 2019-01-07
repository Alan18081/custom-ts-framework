import {Module} from '@astra/common';
import {AuthModule} from '../auth/auth.module';
import {ProjectAccountsController} from './project-accounts.controller';

@Module({
    imports: [AuthModule],
    controllers: [ProjectAccountsController]
})
export class ProjectAccountsModule {}