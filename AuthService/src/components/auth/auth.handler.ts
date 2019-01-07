import { injectable, inject } from 'inversify';
import {
    CommunicationCodes,
    QueuesEnum,
    Messages,
    NotFound,
    SubscribeMessage,
    Validate
} from '@astra/common';
import {JwtResponse} from './interfaces/jwt-response';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { messageBroker } from '../../helpers/message-broker';
import {LoginProjectDto} from './dto/login-project.dto';
import {JwtProject} from './interfaces/jwt-project';
import {LoginProjectAccountDto} from './dto/login-project-account.dto';
import {JwtProjectAccount} from './interfaces/jwt-project-account';

@injectable()
export class AuthHandler {

    @inject(AuthService)
    private readonly authService: AuthService;

    @SubscribeMessage(CommunicationCodes.LOGIN)
    @Validate(LoginDto)
    async login(payload: LoginDto): Promise<JwtResponse> {

        const receivedMessage = await messageBroker.sendMessageAndGetResponse(
            QueuesEnum.USERS_SERVICE,
            CommunicationCodes.GET_USER_BY_EMAIL,
            { email: payload.email }
        );

        if(!receivedMessage.payload) {
            throw new NotFound({ error: Messages.USER_NOT_FOUND });
        }

        return this.authService.login(payload, receivedMessage.payload);
    }

    @SubscribeMessage(CommunicationCodes.LOGIN_PROJECT)
    @Validate(LoginProjectDto)
    async loginProject(payload: LoginProjectDto): Promise<JwtProject> {

        const message = await messageBroker.sendMessageAndGetResponse(
          QueuesEnum.PROJECTS_SERVICE,
          CommunicationCodes.GET_PROJECT_BY_CLIENT_INFO,
          payload
        );

        if(!message.payload) {
            throw new NotFound({ error: Messages.PROJECT_NOT_FOUND });
        }

        return this.authService.loginProject(message.payload);
    }

    @SubscribeMessage(CommunicationCodes.LOGIN_PROJECT_ACCOUNT)
    @Validate(LoginProjectAccountDto)
    async loginProjectAccount(payload: LoginProjectAccountDto): Promise<JwtProjectAccount> {

        const message = await messageBroker.sendMessageAndGetResponse(
          QueuesEnum.PROJECTS_SERVICE,
          CommunicationCodes.GET_PROJECT_ACCOUNT_BY_EMAIL,
            { email: payload.email }
        );

        if(!message.payload) {
            throw new NotFound({ error: Messages.USER_NOT_FOUND });
        }

        return this.authService.loginProjectAccount(payload, message.payload);
    }

}