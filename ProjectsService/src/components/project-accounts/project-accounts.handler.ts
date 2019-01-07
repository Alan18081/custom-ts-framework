import { injectable, inject } from 'inversify';
import {SubscribeMessage, CommunicationCodes, PaginatedResponse, Forbidden, Messages, BadRequest, Validate} from '@astra/common';
import {ProjectAccountsService} from './project-accounts.service';
import {CreateAccountDto} from './dto/create-account.dto';
import {FindAccountsListDto} from './dto/find-accounts-list.dto';
import {ProjectAccount} from './project-account';
import {ProjectsService} from '../projects/projects.service';
import {FindAccountDto} from './dto/find-account.dto';
import {RemoveAccountDto} from './dto/remove-account.dto';
import {FindAccountByEmailDto} from './dto/find-account-by-email.dto';

@injectable()
export class ProjectAccountsHandler {

    @inject(ProjectAccountsService)
    private readonly projectAccountsService: ProjectAccountsService;

    @inject(ProjectsService)
    private readonly projectsService: ProjectsService;

    @SubscribeMessage(CommunicationCodes.GET_PROJECT_ACCOUNTS_LIST)
    @Validate(FindAccountsListDto)
    async findMany(query: FindAccountsListDto): Promise<ProjectAccount[] | PaginatedResponse<ProjectAccount>> {
        if(!(await this.isValidProjectOwner(query.projectId, query.userId))) {
            throw new Forbidden({ error: Messages.INVALID_PERMISSIONS });
        }

        if(query.page && query.limit) {
            return await this.projectAccountsService.findManyWithPagination(query, { page: query.page, limit: query.limit });
        }

        return await this.projectAccountsService.findMany(query);
    }

    @SubscribeMessage(CommunicationCodes.GET_PROJECT_ACCOUNT)
    @Validate(FindAccountDto)
    async findOne(query: FindAccountDto): Promise<ProjectAccount | undefined> {
        return await this.projectAccountsService.findById(query.id);
    }

    @SubscribeMessage(CommunicationCodes.GET_PROJECT_ACCOUNT_BY_EMAIL)
    @Validate(FindAccountByEmailDto)
    async findOneByEmail(query: FindAccountByEmailDto): Promise<ProjectAccount | undefined> {
        return await this.projectAccountsService.findOneByEmail(query.email);
    }


    @SubscribeMessage(CommunicationCodes.CREATE_PROJECT_ACCOUNT)
    @Validate(CreateAccountDto)
    async createOne(payload: CreateAccountDto): Promise<ProjectAccount> {
        const project = await this.projectAccountsService.findOneByEmail(payload.email);

        if(project) {
            throw new BadRequest({ error: Messages.USER_ALREADY_EXISTS });
        }

        return await this.projectAccountsService.createOne(payload);
    }

    private async isValidProjectOwner(projectId: number, userId: number): Promise<boolean> {
        const project = await this.projectsService.findOneByUser(projectId, userId);
        return !!project;
    }

    @SubscribeMessage(CommunicationCodes.REMOVE_PROJECT_ACCOUNT)
    @Validate(RemoveAccountDto)
    async removeOne(query: RemoveAccountDto): Promise<void> {
        await this.projectAccountsService.removeOne(query.accountId);
    }

}