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
            CommunicationCodes.GET_USER_BY_ID,
            { email: payload.email }
        );

        if(!receivedMessage.payload) {
            throw new NotFound({ error: Messages.USER_NOT_FOUND });
        }

        return await this.authService.login(payload, receivedMessage.payload);
    }

}