import {inject, injectable} from 'inversify';
import {CommunicationCodes, SubscribeMessage, Validate, Cached} from '@astra/common';
import {CreateProjectDto} from './dto/create-project.dto';
import {ProjectsService} from './projects.service';
import { UpdateProjectDto } from './dto/update-project.dto';
import { RemoveProjectDto } from './dto/remove-project.dto';
import {FindProjectsListByUserDto} from './dto/find-projects-list-by-user.dto';
import {FindProjectDto} from './dto/find-project.dto';
import {Project} from './project';
import {FindProjectByClientInfoDto} from './dto/find-project-by-client-info.dto';
import {cacheManager} from '../../helpers/cache-manager';
import {CacheFactory} from '../../helpers/cache.factory';

@injectable()
export class ProjectsHandler {

    @inject(ProjectsService)
    private readonly projectsService: ProjectsService;

    @SubscribeMessage(CommunicationCodes.GET_PROJECTS_LIST)
    async findAll(): Promise<Project[]> {
        const cachedData = cacheManager.getValue('projects', 'all');

        if(cachedData) {
            return cachedData;
        }

        const data = await this.projectsService.findAll();
        await cacheManager.saveValue('projects', 'all', data, 3600);
        return data;
    }

    @SubscribeMessage(CommunicationCodes.GET_PROJECTS_LIST_BY_USER)
    @Validate(FindProjectsListByUserDto)
    @Cached(CacheFactory('projects', 4000))
    async findManyByUser(query: FindProjectsListByUserDto): Promise<Project[]> {
        const cachedData = await cacheManager.getValue('projects', 'all');

        if(cachedData) {
            console.log('Returning cached data');
            return cachedData;
        }
        const data = await this.projectsService.findManyByUser(query.userId);
        await cacheManager.saveValue('projects', 'all', data, 3600);
        return data;
    }

    @SubscribeMessage(CommunicationCodes.GET_PROJECT)
    @Validate(FindProjectDto)
    async findOne(query: FindProjectDto): Promise<Project> {
        return await this.projectsService.findOne(query.id);
    }

    @SubscribeMessage(CommunicationCodes.GET_PROJECT_BY_CLIENT_INFO)
    @Validate(FindProjectByClientInfoDto)
    async findOneByClientInfo(query: FindProjectByClientInfoDto): Promise<Project | undefined> {
        return await this.projectsService.findOneByClientInfo(query.clientId, query.clientSecret);
    }

    @SubscribeMessage(CommunicationCodes.CREATE_PROJECT)
    @Validate(CreateProjectDto)
    async createOne(body: CreateProjectDto): Promise<Project> {
        return await this.projectsService.createOne(body);
    }

    @SubscribeMessage(CommunicationCodes.UPDATE_PROJECT)
    @Validate(UpdateProjectDto)
    async updateOne(body: UpdateProjectDto): Promise<Project> {
        return await this.projectsService.updateOne(body);
    }

    @SubscribeMessage(CommunicationCodes.REMOVE_PROJECT)
    @Validate(RemoveProjectDto)
    async removeOne(body: RemoveProjectDto): Promise<void> {
        await this.projectsService.removeOne(body.id);
    }



}