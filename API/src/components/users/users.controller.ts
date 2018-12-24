import {Controller, Post, Get} from '../../lib/server/route-decorators';
import {Body, Query, Param} from '../../lib/server/route-params.decorators';
import {injectable} from 'inversify';
import {Message} from '../../../../Common/broker/message';
import {messageBroker} from '../../lib/broker/message-broker';
import {CommunicationCodes} from '../../../../Common/communication-codes';
import {QueuesEnum} from '../../../../Common/queues.enum';
import {UseGuards} from '../../lib/server/guards-decorators';
import { JwtGuard } from '../../helpers/guards/jwt.guard';

@injectable()
@Controller('users')
export class UsersController {

    @Get('')
    @UseGuards(JwtGuard)
    async findMany(@Query() query: any): Promise<any> {
        return await messageBroker.sendMessageAndGetResponse(QueuesEnum.USERS_SERVICE, new Message(CommunicationCodes.GET_USERS_LIST, query));
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<any> {
        return await messageBroker.sendMessageAndGetResponse(QueuesEnum.USERS_SERVICE, new Message(CommunicationCodes.GET_USER, { id }))
    }

    @Post('')
    async createOne(@Body() body: any): Promise<any> {
        return await messageBroker.sendMessageAndGetResponse(QueuesEnum.USERS_SERVICE, new Message(CommunicationCodes.CREATE_USER, body ));
    }

}