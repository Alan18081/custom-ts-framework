import {inject, injectable} from 'inversify';
import {CommunicationCodes, SubscribeMessage, ValidatorService} from '@astra/common';
import {CreateProjectDto} from './dto/create-project.dto';
import {ProjectsService} from './projects.service';
import { UpdateProjectDto } from './dto/update-project.dto';
import { RemoveProjectDto } from './dto/remove-project.dto';
import {FindProjectsListByUserDto} from './dto/find-projects-list-by-user.dto';
import {FindProjectDto} from './dto/find-project.dto';
import {Project} from './project';

@injectable()
export class ProjectsHandler {

    @inject(ValidatorService)
    private readonly validatorService: ValidatorService;

    @inject(ProjectsService)
    private readonly projectsService: ProjectsService;

    @SubscribeMessage(CommunicationCodes.GET_PROJECTS_LIST)
    async findAll(): Promise<Project[]> {
        return await this.projectsService.findAll();
    }

    @SubscribeMessage(CommunicationCodes.GET_PROJECTS_LIST_BY_USER)
    async findManyByUser(query: FindProjectsListByUserDto): Promise<Project[]> {
        await this.validatorService.validate(query, FindProjectsListByUserDto);

        return await this.projectsService.findManyByUser(query.userId);
    }

    @SubscribeMessage(CommunicationCodes.GET_PROJECT)
    async findOne(query: FindProjectDto): Promise<Project> {
        await this.validatorService.validate(query, FindProjectDto);

        return await this.projectsService.findOne(query.id);
    }

    @SubscribeMessage(CommunicationCodes.CREATE_PROJECT)
    async createOne(body: CreateProjectDto): Promise<Project> {
        await this.validatorService.validate(body, CreateProjectDto);

        return await this.projectsService.createOne(body);
    }

    @SubscribeMessage(CommunicationCodes.UPDATE_PROJECT)
    async updateOne(body: UpdateProjectDto): Promise<Project> {
        await this.validatorService.validate(body, UpdateProjectDto);

        return await this.projectsService.updateOne(body);
    }

    @SubscribeMessage(CommunicationCodes.REMOVE_PROJECT)
    async removeOne(body: RemoveProjectDto): Promise<void> {
        await this.validatorService.validate(body, RemoveProjectDto);
        await this.projectsService.removeOne(body.id);
    }



}