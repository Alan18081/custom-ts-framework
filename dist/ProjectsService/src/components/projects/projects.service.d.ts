import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from '@astra/common';
import { UpdateProjectDto } from './dto/update-project.dto';
export declare class ProjectsService {
    findAll(): Promise<Project[]>;
    findManyByUser(userId: number): Promise<Project[]>;
    findOne(id: number): Promise<Project | undefined>;
    createOne(body: CreateProjectDto): Promise<Project>;
    updateOne(body: UpdateProjectDto): Promise<Project | undefined>;
    removeOne(id: number): Promise<void>;
}
