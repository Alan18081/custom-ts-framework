import { NextFunction, Request } from "express";
import { Response } from "express";
export interface Guard {
    check(req: Request, res: Response, next: NextFunction): void | Promise<void>;
}
export declare type GuardCreator = {
    new (...args: any[]): Guard;
};
export declare type GuardType = Guard | GuardCreator;
export declare function UseGuards(...guards: GuardType[]): MethodDecorator;
