import {Body, CommunicationCodes, Controller, IProject, Post, Project, Put, QueuesEnum, UseGuards} from '@astra/common';
import {injectable} from 'inversify';
import {JwtProjectGuard} from '../../helpers/guards/jwt-project.guard';
import {messageBroker} from '../../helpers/message-broker';
import {CreateOne} from './interfaces/create-one';
import {Login} from './interfaces/login';

@Controller('apiAuth')
@injectable()
export class ApiAuthController {

    @Post('createAccount')
    @UseGuards(JwtProjectGuard)
    async createOne(
        @Project() project: IProject,
        @Body() body: CreateOne
    ): Promise<void> {
        await messageBroker.sendMessageAndGetResponse(
          QueuesEnum.PROJECTS_SERVICE,
          CommunicationCodes.CREATE_PROJECT_ACCOUNT,
            { projectId: project.id, email: body.email, password: body.password, login: body.login }
        );
    }

    @Post('login')
    @UseGuards(JwtProjectGuard)
    async login(
        @Project() project: IProject,
        @Body() body: Login
    ) {
       const message = await messageBroker.sendMessageAndGetResponse(
         QueuesEnum.AUTH_SERVICE,
         CommunicationCodes.LOGIN_PROJECT_ACCOUNT,
           { projectId: project.id, email: body.email, password: body.password }
       );

       return message.payload;
    }
}