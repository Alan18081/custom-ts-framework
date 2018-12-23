import {Controller, Post} from '../../lib/server/route-decorators';
import {Body} from '../../lib/server/route-params.decorators';
import {inject, injectable} from 'inversify';
import {UsersService} from './users.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UsersFilter} from './users.filter';
import {Message} from '../../../../Common/broker/message';
import {messageBroker} from '../../lib/broker/message-broker';
import {CommunicationCodes} from '../../../../Common/communication-codes';
import {QueuesEnum} from '../../../../Common/queues.enum';

@injectable()
@Controller('users')
export class UsersController {
    @inject(UsersService) usersService: UsersService;
    @inject(UsersFilter) usersFilter: UsersFilter;

    @Post('')
    async createOne(@Body() body: CreateUserDto) {
        await this.usersFilter.createUser(body);
        return await messageBroker.sendMessageAndGetResponse(QueuesEnum.USERS_SERVICE, new Message(CommunicationCodes.CREATE_USER, body ));
    }

}