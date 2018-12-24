import {inject, injectable} from 'inversify';
import { CreateUserDto } from './dto/create-user.dto';
import { BadRequest } from '../../helpers/http-errors';
import {ValidatorService} from '../core/services/validator.service';
import {FindUsersListDto} from './dto/find-users-list.dto';
import {FindUserDto} from './dto/find-user.dto';
import { FindUserByEmail } from './dto/find-user-by-email';

@injectable()
export class UsersFilter {
    @inject(ValidatorService)
    private readonly validatorService: ValidatorService;

    async findMany(query: FindUsersListDto): Promise<void> {
       const dataToValidate = new FindUsersListDto(query);
       const errors = await this.validatorService.validate(dataToValidate);

       if(errors) {
           throw new BadRequest({ errors });
       }
    }

    async findOne(query: FindUserDto): Promise<void> {
        const dataToValidate = new FindUserDto(query);
        const errors = await this.validatorService.validate(dataToValidate);

        if(errors) {
            throw new BadRequest({ errors });
        }
    }

    async findOneByEmail(query: FindUserByEmail): Promise<void> {
        const dataToValidate = new FindUserByEmail(query);

        const errors = await this.validatorService.validate(dataToValidate);

        if(errors) {
            throw new BadRequest({ errors });
        }

    }

    async createUser(body: CreateUserDto): Promise<void> {
        const dataToValidate = new CreateUserDto(body);
        const errors = await this.validatorService.validate(dataToValidate);

        if(errors) {
            throw new BadRequest({ errors });
        }

    }

}