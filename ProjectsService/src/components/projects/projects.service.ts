import {injectable, inject} from 'inversify';
import * as uid from 'uid';
import {CreateProjectDto} from './dto/create-project.dto';
import {IProject} from '@astra/common';
import {Project} from './project';
import { UpdateProjectDto } from './dto/update-project.dto';
import {ProjectsRepository} from './projects.repository';

@injectable()
export class ProjectsService {

    @inject(ProjectsRepository)
    private readonly projectsRepository: ProjectsRepository;

    async findAll(): Promise<IProject[]> {
        return await this.projectsRepository.find({});
    }

    async findManyByUser(userId: number): Promise<Project[]> {
        return await this.projectsRepository.find({ userId });
    }

    async findOneByUser(id: number, userId: number): Promise<Project | undefined> {
        return await this.projectsRepository.findOne({ id, userId });
    }

    async findOne(id: number): Promise<Project | undefined> {
        return await this.projectsRepository.findOne({ id });
    }

    async findOneByClientInfo(clientId: string, clientSecret: string): Promise<Project | undefined> {
        return await this.projectsRepository.findOne({ clientId, clientSecret });
    }

    async createOne(body: CreateProjectDto): Promise<Project> {
        const project = new Project({ ...body });
        project.clientId = uid(10);
        project.clientSecret = uid(15);

        console.log(project);

        return await this.projectsRepository.save(project);
    }

    async incrementStoragesCount(id: number): Promise<void> {
        const query = this.projectsRepository.queryBuilder()
            .where({ id })
            .increment('storagesCount', 1);
        await this.projectsRepository.getOneQueryResult(query);
    }

    async decrementStoragesCount(id: number): Promise<void> {
        const query = this.projectsRepository.queryBuilder()
            .where({ id })
            .decrement('storagesCount', 1);
        await this.projectsRepository.getOneQueryResult(query);
    }

    async updateOne(body: UpdateProjectDto): Promise<Project | undefined> {
        return await this.projectsRepository.update({ id: body.id }, { ...body });
    }

    async removeOne(id: number): Promise<void> {
        await this.projectsRepository.delete({ id });
    }

}