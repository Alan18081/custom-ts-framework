import { injectable, inject } from 'inversify';
import { SubscribeMessage } from '../../lib/broker/decorators';
import { CommunicationCodes } from '../../../../Common/communication-codes';
import {JwtResponse} from './jwt-response';
import {AuthFilter} from './auth.filter';
import { messageBroker } from '../../lib/broker/message-broker';
import { QueuesEnum } from '../../../../Common/queues.enum';
import { NotFound } from '../../helpers/http-errors';
import {Messages} from '../../../../Common/messages';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@injectable()
export class AuthHandler {

    @inject(AuthService)
    private readonly authService: AuthService;

    @inject(AuthFilter)
    private readonly authFilter: AuthFilter;

    @SubscribeMessage(CommunicationCodes.LOGIN)
    async login(payload: LoginDto): Promise<JwtResponse> {
        await this.authFilter.login(payload);
        const message = new Message(CommunicationCodes.GET_USER_BY_ID, { email: payload.email });
        const user = await messageBroker.sendMessageAndGetResponse(QueuesEnum.USERS_SERVICE, message);
        if(!user) {
            throw new NotFound({ error: Messages.USER_NOT_FOUND });
        }

        return await this.authService.login(payload, user);
    }

}