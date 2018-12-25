import { validate } from 'class-validator';
import {ValidationError} from '@astra/common';
import {injectable} from 'inversify';

@injectable()
export class ValidatorService {
    async validate(body: any = {}): Promise<ValidationError[] | undefined> {
        const errors = await validate(body);
        if(errors.length) {
            return errors.map(({ property, constraints }): ValidationError => ({
                property,
                constraints: Object.keys(constraints).map(key => constraints[key])
            }));
        }
    }
}