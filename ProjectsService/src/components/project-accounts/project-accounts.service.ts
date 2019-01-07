import { injectable, inject } from 'inversify';
import {ProjectAccountsRepository} from './project-accounts.repository';
import {ProjectAccount} from './project-account';
import {CreateAccountDto} from './dto/create-account.dto';
import {FindAccountsListDto} from './dto/find-accounts-list.dto';
import {PaginatedResponse, PaginationDto, HashService} from '@astra/common';

@injectable()
export class ProjectAccountsService {

    @inject(ProjectAccountsRepository)
    private readonly projectAccountRepository: ProjectAccountsRepository;

    @inject(HashService)
    private readonly hashService: HashService;

    async findMany({userId, ...query}: FindAccountsListDto): Promise<ProjectAccount[]> {
        return await this.projectAccountRepository.find(query);
    }

    async findManyWithPagination({ projectId }: FindAccountsListDto, { page, limit }: Required<PaginationDto>): Promise<PaginatedResponse<ProjectAccount>> {
        return await this.projectAccountRepository.findManyWithPagination({ projectId }, { page, limit });
    }

    async findById(id: number): Promise<ProjectAccount | undefined> {
       return await this.projectAccountRepository.findOne({ id });
    }

    async findOneByEmail(email: string): Promise<ProjectAccount | undefined> {
        return await this.projectAccountRepository.findOne({ email, deletedAt: null });
    }

    async createOne(payload: CreateAccountDto): Promise<ProjectAccount> {
        const newAccount = new ProjectAccount(payload);
        newAccount.password = await this.hashService.generateHash(payload.password);

        return await this.projectAccountRepository.save(newAccount);
    }

    async removeOne(id: number): Promise<void> {
        await this.projectAccountRepository.update({ id }, { deletedAt: new Date() });
    }
}