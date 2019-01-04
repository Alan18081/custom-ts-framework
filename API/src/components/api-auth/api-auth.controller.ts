import {Body, CommunicationCodes, Controller, IProject, Post, Project, Put, QueuesEnum, UseGuards} from '@astra/common';
import {injectable} from 'inversify';
import {JwtProjectGuard} from '../../helpers/guards/jwt-project.guard';
import {messageBroker} from '../../helpers/message-broker';

@Controller('apiAuth')
@injectable()
export class ApiAuthController {

    @Post('createAccount')
    @UseGuards(JwtProjectGuard)
    async createOne(
        @Project() project: IProject,
        @Body() body: any
    ) {
        const message = await messageBroker.sendMessageAndGetResponse(
          QueuesEnum.PROJECTS_SERVICE,
          CommunicationCodes.CREATE_PROJECT_ACCOUNT,
            { projectId: project.id, email: body.email, password: body.password }
        );

        return message.payload;
    }

    @Post('login')
    @UseGuards(JwtProjectGuard)
    async login(
        @Project() project: IProject,
        @Body() body: any
    ) {
       const message = await messageBroker.sendMessageAndGetResponse(
         QueuesEnum.PROJECTS_SERVICE,
         CommunicationCodes.LOGIN_PROJECT_ACCOUNT,
           { projectId: project.id, email: body.email, password: body.password }
       );

       return message.payload;
    }
}