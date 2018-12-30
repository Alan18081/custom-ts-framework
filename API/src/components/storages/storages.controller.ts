import {injectable} from 'inversify';
import { messageBroker } from '../../helpers/message-broker';
import {
    Body,
    CommunicationCodes,
    Controller, Delete,
    Get, Param,
    Post,
    Put,
    Query,
    QueuesEnum, ReqUser,
    UseGuards, IStorage, IUser
} from '@astra/common';
import {JwtGuard} from '../../helpers/guards/jwt.guard';

@injectable()
@Controller('storages')
export class StoragesController {

    @Get('all')
    @UseGuards(JwtGuard)
    async findAll(@Query() query: any): Promise<IStorage[]> {
        const message = await messageBroker.sendMessageAndGetResponse(
            QueuesEnum.PROJECTS_SERVICE,
            CommunicationCodes.GET_STORAGES_LIST,
            query
        );

        return message.payload;
    }

    @Get('')
    @UseGuards(JwtGuard)
    async findManyByUser(@ReqUser() user: IUser): Promise<IStorage[]> {
        const message = await messageBroker.sendMessageAndGetResponse(
          QueuesEnum.PROJECTS_SERVICE,
          CommunicationCodes.GET_STORAGES_LIST,
            { userId: user.id }
        );

        return message.payload;
    }

    @Get(':id')
    @UseGuards(JwtGuard)
    async findOne(@Param('id') id: number, @ReqUser() user: IUser): Promise<IStorage> {
        const message = await messageBroker.sendMessageAndGetResponse(
          QueuesEnum.PROJECTS_SERVICE,
          CommunicationCodes.GET_STORAGE,
            { id, userId: user.id }
        );

        return message.payload;
    }

    @Post('')
    @UseGuards(JwtGuard)
    async createOne(@ReqUser() user: IUser, @Body() body: any): Promise<IStorage> {
        const message =  await messageBroker.sendMessageAndGetResponse(
          QueuesEnum.PROJECTS_SERVICE,
          CommunicationCodes.CREATE_STORAGE,
            { ...body, userId: user.id }
        );

        return message.payload;
    }

    @Put(':id')
    @UseGuards(JwtGuard)
    async updateOne(@Param('id') id: number, @ReqUser() user: IUser, @Body() body: any): Promise<IStorage | undefined> {
        const message = await messageBroker.sendMessageAndGetResponse(
          QueuesEnum.PROJECTS_SERVICE,
          CommunicationCodes.UPDATE_STORAGE,
            { ...body, userId: user.id, id  }
        );

        return message.payload;
    }

    @Put(':id/data')
    @UseGuards(JwtGuard)
    async updateOneData(@Param('id') id: number, @Body() body: any): Promise<IStorage | undefined> {
        const message = await messageBroker.sendMessageAndGetResponse(
          QueuesEnum.DATA_SERVICE,
          CommunicationCodes.UPDATE_STORAGE_DATA,
            { storageId: id, data: body }
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