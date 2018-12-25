import {inject, injectable} from 'inversify';
import {CommunicationCodes, Project, SubscribeMessage} from '@astra/common';
import {CreateProjectDto} from './dto/create-project.dto';
import {ProjectsFilter} from './projects.filter';
import {ProjectsService} from './projects.service';

@injectable()
export class ProjectsHandler {

    @inject(ProjectsFilter)
    private readonly projectsFilter: ProjectsFilter;

    @inject(ProjectsService)
    private readonly projectsService: ProjectsService;

    @SubscribeMessage(CommunicationCodes.CREATE_PROJECT)
    async createOne(body: CreateProjectDto): Promise<Project> {
        await this.projectsFilter.createOne(body);

        return await this.projectsService.createOne(body);
    }

}