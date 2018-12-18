import {Request} from "express";
import {Response} from "express";
import { getHandler } from './route-params.decorators';

export interface Guard {
    check(req: Request, res: Response): boolean | Promise<boolean>
}

export type GuardCreator = {
    new(...args): Guard
}

export function UseGuards(...guards: GuardCreator[]): MethodDecorator {
    return function (target: any, name: string, descriptor: PropertyDescriptor) {
        const handler = getHandler(target, name, descriptor);
        handler.guards = [...handler.guards, ...guards ];
    }
}

