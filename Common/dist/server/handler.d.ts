import { RequestHandler } from 'express-serve-static-core';
import { GuardType } from "./guards-decorators";
import { METHODS } from '../metadata/keys';
export declare class Handler {
    name: string;
    middlewares: RequestHandler[];
    validators: Function[];
    guards: GuardType[];
    path: string;
    method: METHODS;
    handler: any;
    controller: Function;
    constructor(data: Partial<Handler>);
}
