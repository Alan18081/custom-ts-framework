import {Controller, Post, Get, Param, QueuesEnum, Query, Message, CommunicationCodes, UseGuards, Body} from '@astra/common';
import {injectable} from 'inversify';
import {messageBroker} from '../../helpers/message-broker';
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