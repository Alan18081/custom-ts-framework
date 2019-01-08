import {
    Body,
    CommunicationCodes,
    Controller,
    Delete,
    Get,
    IUser,
    Param,
    Post,
    Put,
    Query,
    QueuesEnum,
    Roles,
    UseGuards
} from '@astra/common';
import { injectable } from 'inversify';
import { messageBroker } from '../../helpers/message-broker';
import { JwtGuard } from '../../helpers/guards/jwt.guard';
import { rolesGuardsFactory } from '../../helpers/roles-guards.factory';
import { ResetPassword } from './intefaces/reset-password';

@injectable()
@Controller('users')
export class UsersController {

    @Get('')
    @UseGuards(JwtGuard, rolesGuardsFactory(Roles.ADMIN))
    async findMany(@Query() query: any): Promise<IUser[]> {
        const message = await messageBroker.sendMessageAndGetResponse(
          QueuesEnum.USERS_SERVICE,
          CommunicationCodes.GET_USERS_LIST,
          query
        );

        console.log('Users list message', message);

        return message.payload;
    }

    @Get(':id')
    @UseGuards(JwtGuard, rolesGuardsFactory(Roles.ADMIN))
    async findOne(@Param('id') id: number): Promise<IUser | undefined> {
        const message = await messageBroker.sendMessageAndGetResponse(
          QueuesEnum.USERS_SERVICE,
          CommunicationCodes.GET_USER,
          { id }
        );

        return message.payload;
    }

    @Post('')
    async createOne(@Body() body: any): Promise<IUser> {
        const message = await messageBroker.sendMessageAndGetResponse(
          QueuesEnum.USERS_SERVICE,
          CommunicationCodes.CREATE_USER,
          body
        );

        return message.payload;
    }

    @Put(':id')
    @UseGuards(JwtGuard, rolesGuardsFactory(Roles.ADMIN))
    async updateOne(@Param('id') id: number, @Body() body: any): Promise<IUser | undefined> {
        const message = await messageBroker.sendMessageAndGetResponse(
          QueuesEnum.USERS_SERVICE,
          CommunicationCodes.UPDATE_USER,
          { ...body, id }
        );

        return message.payload;
    }

    @Delete(':id')
    @UseGuards(JwtGuard, rolesGuardsFactory(Roles.ADMIN))
    async removeOne(@Param('id') id: number): Promise<void> {
        await messageBroker.sendMessageAndGetResponse(
          QueuesEnum.USERS_SERVICE,
          CommunicationCodes.REMOVE_USER,
          { id }
        );
    }

    @Post('resetPassword')
    async resetPassword(@Body() body: ResetPassword): Promise<void> {
        await messageBroker.sendMessageAndGetResponse(
          QueuesEnum.USERS_SERVICE,
          CommunicationCodes.RESET_USER_PASSWORD,
          { email: body.email }
        );
    }

}