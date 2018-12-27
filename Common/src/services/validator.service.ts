import { validate } from 'class-validator';
import { ValidationError } from '../interfaces';
import { injectable } from 'inversify';
import {BadRequest} from '../server';

@injectable()
export class ValidatorService {
    async validate(body: any = {}, DtoType: { new(...args) }): Promise<void> {
        const data = new DtoType(body);
        const errors = await validate(data);
        if(errors.length) {
            const errorMessages = errors.map(({ property, constraints }): ValidationError => ({
                property,
                constraints: Object.keys(constraints).map(key => constraints[key])
            }));

            throw new BadRequest({ errors: errorMessages });
        }
    }
}