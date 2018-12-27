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
    QueuesEnum,
    UseGuards
} from '@astra/common';
import {JwtGuard} from '../../helpers/guards/jwt.guard';

@injectable()
@Controller('projects')
export class ProjectsController {

    @Get('all')
    @UseGuards(JwtGuard)
    async findAll(@Query() query: any): Promise<Project[]> {
        const message = await messageBroker.sendMessageAndGetResponse(
            QueuesEnum.PROJECTS_SERVICE,
            CommunicationCodes.GET_PROJECTS_LIST,
            query
        );

        return message.payload;
    }

    @Get('')
    @UseGuards(JwtGuard)
    async findManyByUser(@User() user: User): Promise<Project[]> {
        const message = await messageBroker.sendMessageAndGetResponse(
          QueuesEnum.PROJECTS_SERVICE,
          CommunicationCodes.GET_PROJECTS_LIST_BY_USER,
            { userId: user.id }
        );

        return message.payload;
    }

    @Get(':id')
    @UseGuards(JwtGuard)
    async findOne(@Param('id') id: number, @User() user: User): Promise<Project> {
        const message = await messageBroker.sendMessageAndGetResponse(
          QueuesEnum.PROJECTS_SERVICE,
          CommunicationCodes.GET_PROJECT,
            { id, userId: user.id }
        );

        return message.payload;
    }

    @Post('')
    @UseGuards(JwtGuard)
    async createOne(@User() user, @Body() body: any): Promise<Project> {
        const message =  await messageBroker.sendMessageAndGetResponse(
          QueuesEnum.PROJECTS_SERVICE,
          CommunicationCodes.CREATE_PROJECT,
            { ...body, userId: user.id }
        );

        return message.payload;
    }

    @Put(':id')
    @UseGuards(JwtGuard)
    async updateOne(@Param('id') id: number, @User() user: User, @Body() body: any): Promise<Project | undefined> {
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