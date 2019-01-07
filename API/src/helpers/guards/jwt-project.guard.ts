import {NextFunction, Response} from 'express';
import {AuthService} from '../../components/auth/auth.service';
import {Guard, Messages, Unauthorized, ProjectRequest, CommunicationCodes, QueuesEnum} from '@astra/common';
import {inject, injectable} from 'inversify';
import {messageBroker} from '../message-broker';

@injectable()
export class JwtProjectGuard implements Guard {

    @inject(AuthService)
    private readonly authService: AuthService;

    async check(req: ProjectRequest, res: Response, next: NextFunction): Promise<void> {
        const { projectToken } = req.query;

        if(!projectToken) {
            throw new Unauthorized({ error: Messages.PROJECT_TOKEN_NOT_FOUND });
        }

        const data = await this.authService.authenticateJwtProject(projectToken);

        const { payload } = await messageBroker.sendMessageAndGetResponse(
            QueuesEnum.PROJECTS_SERVICE,
            CommunicationCodes.GET_PROJECT,
            { id: data.id }
        );

        if(!payload) {
            throw new Unauthorized({ error: Messages.PROJECT_NOT_FOUND });
        }
        req.project = payload;
        next();
    }
}