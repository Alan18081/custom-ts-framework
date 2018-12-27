import {injectable} from 'inversify';
import { messageBroker } from '../../helpers/message-broker';
import {
    Body,
    CommunicationCodes,
    Controller, Delete,
    Get, Param,
    Post,
    Project,
    Put,
    Query,
    QueuesEnum, ReqUser,
    UseGuards, User
} from '@astra/common';
import {JwtGuard} from '../../helpers/guards/jwt.guard';

@injectable()
@Controller('projects')
export class StoragesController {

    @Get('all')
    @UseGuards(JwtGuard)
    async findAll(@Query() query: any): Promise<Project[]> {
        const message = await messageBroker.sendMessageAndGetResponse(
            QueuesEnum.PROJECTS_SERVICE,
            CommunicationCodes.GET_STORAGES_LIST,
            query
        );

        return message.payload;
    }

    @Get('')
    @UseGuards(JwtGuard)
    async findManyByUser(@ReqUser() user: User): Promise<Project[]> {
        const message = await messageBroker.sendMessageAndGetResponse(
          QueuesEnum.PROJECTS_SERVICE,
          CommunicationCodes.GET_STORAGES_LIST,
            { userId: user.id }
        );

        return message.payload;
    }

    @Get(':id')
    @UseGuards(JwtGuard)
    async findOne(@Param('id') id: number, @ReqUser() user: User): Promise<Project> {
        const message = await messageBroker.sendMessageAndGetResponse(
          QueuesEnum.PROJECTS_SERVICE,
          CommunicationCodes.GET_STORAGE,
            { id, userId: user.id }
        );

        return message.payload;
    }

    @Post('')
    @UseGuards(JwtGuard)
    async createOne(@ReqUser() user: User, @Body() body: any): Promise<Project> {
        const message =  await messageBroker.sendMessageAndGetResponse(
          QueuesEnum.PROJECTS_SERVICE,
          CommunicationCodes.CREATE_STORAGE,
            { ...body, userId: user.id }
        );

        return message.payload;
    }

    @Put(':id')
    @UseGuards(JwtGuard)
    async updateOne(@Param('id') id: number, @ReqUser() user: User, @Body() body: any): Promise<Project | undefined> {
        const message = await messageBroker.sendMessageAndGetResponse(
          QueuesEnum.PROJECTS_SERVICE,
          CommunicationCodes.UPDATE_STORAGE,
            { ...body, userId: user.id, id  }
        );

        return message.payload;
    }

    @Delete(':id')
    @UseGuards(JwtGuard)
    async removeOne(@Param('id') id: number): Promise<void> {
        await messageBroker.sendMessageAndGetResponse(
            QueuesEnum.PROJECTS_SERVICE,
            CommunicationCodes.REMOVE_STORAGE,
            { id }
        );
    }

}