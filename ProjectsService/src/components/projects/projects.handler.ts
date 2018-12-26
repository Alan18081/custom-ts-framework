import {inject, injectable} from 'inversify';
import {CommunicationCodes, Project, SubscribeMessage} from '@astra/common';
import {CreateProjectDto} from './dto/create-project.dto';
import {ProjectsService} from './projects.service';
import { ValidatorService } from '../core/services/validator.service';
import { UpdateProjectDto } from './dto/update-project.dto';
import { RemoveProjectDto } from './dto/remove-project.dto';

@injectable()
export class ProjectsHandler {

    @inject(ValidatorService)
    private readonly validatorService: ValidatorService;

    @inject(ProjectsService)
    private readonly projectsService: ProjectsService;

    @SubscribeMessage(CommunicationCodes.CREATE_PROJECT)
    async createOne(body: CreateProjectDto): Promise<Project> {
        await this.validatorService.validate(body, CreateProjectDto);

        return await this.projectsService.createOne(body);
    }

    @SubscribeMessage(CommunicationCodes.UPDATE_PROJECT)
    async createOne(body: UpdateProjectDto): Promise<Project> {
        await this.validatorService.validate(body, UpdateProjectDto);

        return await this.projectsService.updateOne(body);
    }

    @SubscribeMessage(CommunicationCodes.REMOVE_PROJECT)
    async createOne(body: RemoveProjectDto): Promise<void> {
        await this.validatorService.validate(body, RemoveProjectDto);
        await this.projectsService.removeOne(body.id);
    }



}