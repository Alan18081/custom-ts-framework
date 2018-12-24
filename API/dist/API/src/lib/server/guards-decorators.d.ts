import { NextFunction, Request } from "express";
import { Response } from "express";
export interface Guard {
    check(req: Request, res: Response, next: NextFunction): boolean | Promise<boolean>;
}
export declare type GuardCreator = {
    new (...args: any[]): Guard;
};
export declare function UseGuards(...guards: GuardCreator[]): MethodDecorator;
