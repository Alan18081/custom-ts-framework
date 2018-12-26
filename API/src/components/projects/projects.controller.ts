import {injectable} from 'inversify';
import { messageBroker } from '../../helpers/message-broker';
import {Body, CommunicationCodes, Controller, Get, Post, Project, Query, QueuesEnum, UseGuards} from '@astra/common';
import {JwtGuard} from '../../helpers/guards/jwt.guard';

@injectable()
@Controller('projects')
export class ProjectsController {

    @Get('')
    @UseGuards(JwtGuard)
    async findAll(@Query() query: any): Promise<Project[]> {
        const message = await messageBroker.sendMessageAndGetResponse(
            QueuesEnum.PROJECTS_SERVICE,
            CommunicationCodes.GET_PROJECTS_LIST,
            query
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

}