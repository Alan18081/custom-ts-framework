import {injectable} from 'inversify';
import * as uid from 'uid';
import {CreateProjectDto} from './dto/create-project.dto';
import {Project} from '@astra/common';
import {ProjectModel} from './project.model';
import { UpdateProjectDto } from './dto/update-project.dto';

@injectable()
export class ProjectsService {

    async findAll(): Promise<Project[]> {
        return await ProjectModel.find({});
    }

    async findManyByUser(userId: number): Promise<Project[]> {
        return await ProjectModel.find({ userId });
    }

    async findOne(id: number): Promise<Project | undefined> {
        return await ProjectModel.findOne({ id });
    }

    async createOne(body: CreateProjectDto): Promise<Project> {
        const project = new ProjectModel({ ...body });
        project.clientId = uid(10);
        project.clientSecret = uid(15);

        return await ProjectModel.save(project);
    }

    async updateOne(body: UpdateProjectDto): Promise<Project | undefined> {
        return await ProjectModel.update({ id: body }, { ...body });
    }

    async removeOne(id: number): Promise<void> {
        await ProjectModel.delete({ id });
    }

}