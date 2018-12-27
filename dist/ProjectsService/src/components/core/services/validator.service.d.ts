import { ValidationError } from '@astra/common';
export declare class ValidatorService {
    validate(body: any, DtoType: {
        new (...args: any[]): any;
    }): Promise<ValidationError[] | undefined>;
}
