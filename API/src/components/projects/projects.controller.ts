import { injectable } from 'inversify';
import { messageBroker } from '../../helpers/message-broker';
import { toNumber } from 'lodash';
import {
    Body,
    CommunicationCodes,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    IProject,
    Put,
    Query,
    QueuesEnum,
    ReqUser,
    Roles,
    UseGuards,
    IUser,
} from '@astra/common';
import { JwtGuard } from '../../helpers/guards/jwt.guard';
import { rolesGuardsFactory } from '../../helpers/roles-guards.factory';

@injectable()
@Controller('projects')
export class ProjectsController {

    @Get('all')
    @UseGuards(JwtGuard, rolesGuardsFactory(Roles.ADMIN))
    async findAll(@Query() query: any): Promise<IProject[]> {

        const message = await messageBroker.sendMessageAndGetResponse(
            QueuesEnum.PROJECTS_SERVICE,
            CommunicationCodes.GET_PROJECTS_LIST,
            query
        );

        return message.payload;
    }

    @Get('')
    @UseGuards(JwtGuard)
    async findManyByUser(@ReqUser() user: IUser): Promise<IProject[]> {
        console.log('Data', user);
        const message = await messageBroker.sendMessageAndGetResponse(
          QueuesEnum.PROJECTS_SERVICE,
          CommunicationCodes.GET_PROJECTS_LIST_BY_USER,
            { userId: toNumber(user.id) }
        );

        return message.payload;
    }

    @Get(':id')
    @UseGuards(JwtGuard)
    async findOne(@Param('id') id: number, @ReqUser() user: IUser): Promise<IProject> {
        const message = await messageBroker.sendMessageAndGetResponse(
          QueuesEnum.PROJECTS_SERVICE,
          CommunicationCodes.GET_PROJECT,
            { id: toNumber(id), userId: toNumber(user.id) }
        );

        return message.payload;
    }

    @Post('')
    @UseGuards(JwtGuard)
    async createOne(@ReqUser() user: IUser, @Body() body: any): Promise<IProject> {
        console.log(user);
        const message =  await messageBroker.sendMessageAndGetResponse(
          QueuesEnum.PROJECTS_SERVICE,
          CommunicationCodes.CREATE_PROJECT,
            { ...body, userId: user.id }
        );

        return message.payload;
    }

    @Put(':id')
    @UseGuards(JwtGuard)
    async updateOne(@Param('id') id: number, @ReqUser() user: IUser, @Body() body: any): Promise<IProject | undefined> {
        const message = await messageBroker.sendMessageAndGetResponse(
          QueuesEnum.PROJECTS_SERVICE,
          CommunicationCodes.UPDATE_PROJECT,
            { ...body, userId: user.id, id  }
        );

        return message.payload;
    }

    @Delete(':id')
    @UseGuards(JwtGuard)
    async removeOne(@Param('id') id: number): Promise<void> {
        await messageBroker.sendMessageAndGetResponse(
            QueuesEnum.PROJECTS_SERVICE,
            CommunicationCodes.REMOVE_PROJECT,
            { id }
        );
    }

}