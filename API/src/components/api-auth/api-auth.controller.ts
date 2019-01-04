import {Controller, IProject, Post, Project, UseGuards} from '@astra/common';
import {injectable} from 'inversify';
import {JwtProjectGuard} from '../../helpers/guards/jwt-project.guard';

@Controller('apiAuth')
@injectable()
export class ApiAuthController {

    @Post('')
    @UseGuards(JwtProjectGuard)
    async createOne(
        @Project() project: IProject
    ) {

    }
}