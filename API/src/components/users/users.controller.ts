import {Controller, Post} from '../../server/route-decorators';
import {Body} from '../../server/route-params.decorators';
import {inject, injectable} from 'inversify';
import {UsersService} from './users.service';
import {MessageBroker} from '../../broker/message-broker';

@injectable()
@Controller('users')
export class UsersController {
    @inject(MessageBroker) messageBroker: MessageBroker;
    @inject(UsersService) usersService: UsersService;

    @Post('')
    async createOne(@Body() body: any) {
        this.usersService.createUser();
    }

}