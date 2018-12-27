import { Project } from '@astra/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { FindProjectsListByUserDto } from './dto/find-projects-list-by-user.dto';
import { FindProjectDto } from './dto/find-project.dto';
export declare class ProjectsHandler {
    private readonly validatorService;
    private readonly projectsService;
    findAll(): Promise<Project[]>;
    findManyByUser(query: FindProjectsListByUserDto): Promise<Project[]>;
    findOne(query: FindProjectDto): Promise<Project>;
    createOne(body: CreateProjectDto): Promise<Project>;
}
