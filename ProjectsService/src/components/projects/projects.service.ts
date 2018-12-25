import {injectable} from 'inversify';
import {CreateProjectDto} from './dto/create-project.dto';
import {Project} from '@astra/common';

@injectable()
export class ProjectsService {

    async createOne(body: CreateProjectDto): Promise<Project> {

    }

}