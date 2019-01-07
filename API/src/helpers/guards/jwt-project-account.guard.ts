import {NextFunction, Response} from 'express';
import {AuthService} from '../../components/auth/auth.service';
import {Guard, Messages, Unauthorized, ProjectAccountRequest, CommunicationCodes, QueuesEnum} from '@astra/common';
import {inject, injectable} from 'inversify';
import {messageBroker} from '../message-broker';

@injectable()
export class JwtProjectAccountGuard implements Guard {

    @inject(AuthService)
    private readonly authService: AuthService;

    async check(req: ProjectAccountRequest, res: Response, next: NextFunction): Promise<void> {
        const { accountToken } = req.query;

        if(!accountToken) {
            throw new Unauthorized({ error: Messages.ACCOUNT_TOKEN_NOT_FOUND });
        }

        const accountData = await this.authService.authenticateJwtProjectAccount(accountToken);

        const { payload } = await messageBroker.sendMessageAndGetResponse(
            QueuesEnum.PROJECTS_SERVICE,
            CommunicationCodes.GET_PROJECT_ACCOUNT,
            { id: accountData.id }
        );
        if(!payload) {
            throw new Unauthorized({ error: Messages.ACCOUNT_NOT_FOUND });
        }

        req.projectAccount = payload;
        next();
    }
}