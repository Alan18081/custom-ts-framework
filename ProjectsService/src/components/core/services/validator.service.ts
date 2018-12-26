import { validate } from 'class-validator';
import { ValidationError } from '@astra/common';
import { injectable, interfaces } from 'inversify';
import Abstract = interfaces.Abstract;

@injectable()
export class ValidatorService {
    async validate(body: any = {}, DtoType: { new(...args) }): Promise<ValidationError[] | undefined> {
        const data = new DtoType(body);
        const errors = await validate(data);
        if(errors.length) {
            return errors.map(({ property, constraints }): ValidationError => ({
                property,
                constraints: Object.keys(constraints).map(key => constraints[key])
            }));
        }
    }
}