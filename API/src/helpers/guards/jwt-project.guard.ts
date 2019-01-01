import {NextFunction, Response} from 'express';
import {AuthService} from '../../components/auth/auth.service';
import {Guard, Messages, Unauthorized, ProjectRequest} from '@astra/common';
import {inject, injectable} from 'inversify';

@injectable()
export class JwtProjectGuard implements Guard {

    @inject(AuthService)
    private readonly authService: AuthService;

    async check(req: ProjectRequest, res: Response, next: NextFunction): Promise<void> {
        const { token } = req.query;

        if(!token) {
            throw new Unauthorized({ error: Messages.PROJECT_TOKEN_NOT_FOUND });
        }

        const project = await this.authService.authenticateJwtProject(token);
        req.project = project;
        next();
    }
}