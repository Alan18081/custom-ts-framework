import { injectable } from 'inversify';
import { LoginDto } from './dto/login.dto';
import {BadRequest} from '../../../../UsersService/src/helpers/http-errors';
import {ValidatorService} from '../core/services/validator.service';

@injectable()
export class AuthFilter {

    @inject(ValidatorService)
    private readonly validatorService: ValidatorService;

    async login(payload: LoginDto): Promise<void> {
        const dataToValidate = new LoginDto(payload);
        const errors = await this.validatorService.validate(dataToValidate);

        if(errors) {
            throw new BadRequest({ errors });
        }


    }

}