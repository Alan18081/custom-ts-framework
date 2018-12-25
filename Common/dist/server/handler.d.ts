import { RequestHandler } from 'express-serve-static-core';
import { METHODS_LIST } from './interfaces';
import { GuardCreator } from "./guards-decorators";
export declare class Handler {
    name: string;
    middlewares: RequestHandler[];
    validators: Function[];
    guards: GuardCreator[];
    path: string;
    method: METHODS_LIST;
    handler: any;
    controller: Function;
    constructor(data: Partial<Handler>);
    addValidator(validators: Function[]): void;
}
