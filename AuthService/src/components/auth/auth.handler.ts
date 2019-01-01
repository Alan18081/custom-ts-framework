import { injectable, inject } from 'inversify';
import {
    CommunicationCodes,
    QueuesEnum,
    Messages,
    NotFound,
    SubscribeMessage,
    ValidatorService
} from '@astra/common';
import {JwtResponse} from './interfaces/jwt-response';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { messageBroker } from '../../helpers/message-broker';
import {LoginProjectDto} from './dto/login-project.dto';
import {JwtProject} from './interfaces/jwt-project';

@injectable()
export class AuthHandler {

    @inject(AuthService)
    private readonly authService: AuthService;

    @inject(ValidatorService)
    private readonly validatorService: ValidatorService;

    @SubscribeMessage(CommunicationCodes.LOGIN)
    async login(payload: LoginDto): Promise<JwtResponse> {
        await this.validatorService.validate(payload, LoginDto);
        
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
    async loginProject(payload: LoginProjectDto): Promise<JwtProject> {
        console.log(payload);
        await this.validatorService.validate(payload, LoginProjectDto);

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

}