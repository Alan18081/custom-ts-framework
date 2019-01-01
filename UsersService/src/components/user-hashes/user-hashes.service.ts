import {injectable, inject} from 'inversify';
import {UserHashesRepository} from './user-hashes.repository';
import {UserHash} from './user-hash';
import {HashService} from '@astra/common';

@injectable()
export class UserHashesService {

    @inject(UserHashesRepository)
    private readonly userHashesRepository: UserHashesRepository;

    @inject(HashService)
    private readonly hashService: HashService;

    async createOne(userId: number): Promise<UserHash> {

    }

}