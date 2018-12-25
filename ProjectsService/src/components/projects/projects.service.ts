import {injectable} from 'inversify';
import * as uid from 'uid';
import {CreateProjectDto} from './dto/create-project.dto';
import {Project} from '@astra/common';
import {ProjectModel} from './project.model';

@injectable()
export class ProjectsService {

    async findOne(id: number): Promise<Project | undefined> {
        const query = ProjectModel.createQueryBuilder()
            .select('*')
            .from(ProjectModel.tableName)
            .where();
    }

    async createOne(body: CreateProjectDto): Promise<Project> {
        const project = new ProjectModel({ ...body });
        project.clientId = uid(10);
        project.clientSecret = uid(15);

        return await ProjectModel.save(project);
    }

    async removeOne(id: number): Promise<void> {
        await ProjectModel.delete({ id });
    }

}