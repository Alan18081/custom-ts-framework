import {inject, injectable} from 'inversify';
import {ValidatorService} from '../core/services/validator.service';
import {CreateProjectDto} from './dto/create-project.dto';
import {BadRequest} from '@astra/common';

@injectable()
export class ProjectsFilter {

    @inject(ValidatorService)
    private readonly validatorService: ValidatorService;

    async createOne(body: CreateProjectDto): Promise<void> {
        const dataToValidate = new CreateProjectDto(body);
        const errors = await this.validatorService.validate(dataToValidate);

        if(errors) {
            throw new BadRequest({ errors });
        }
    }

}