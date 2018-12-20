import * as express from 'express';
import {METADATA_KEY, PARAMS_TYPES} from './metadata';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { MODULE_KEYS } from '../../../Common/metadata/keys';
import { Handler } from './handler';
import * as bodyParser from 'body-parser';
import {PARAM} from './interfaces';
import {Guard, GuardCreator} from "./guards-decorators";
import {Injector} from "../modules/injector";

export class Server {

  private readonly port: number;
  private readonly app: express.Application;

  constructor(port: number) {
    this.port = port;
    this.app = express();
    this.app.use(bodyParser.json());
    this.registerControllers();
  }

  run() {
    this.app.listen(this.port, () => {
      console.log(`Server is listening on port ${this.port}`);
    });
  }

  private registerControllers() {
    const modules = Reflect.getMetadata(METADATA_KEY.module, Reflect) || [];


    modules.forEach(({ type }) => {
      const controllers = Reflect.getMetadata(MODULE_KEYS.controllers, type);
      const controllersList = Object.keys(controllers).map(key => controllers[key]);
      const servicesList = Reflect.getMetadata(MODULE_KEYS.services, type) || {};

      controllersList.forEach(controller => {
        const methods = Reflect.getMetadata(METADATA_KEY.controllerMethod, controller.type) || {};
        const params = Reflect.getMetadata(METADATA_KEY.controllerParams, controller.type);

        const methodsList = Object.keys(methods).map(key => methods[key]);

        methodsList.forEach(({ method, handler, path, middlewares, name, validators, guards }: Handler) => {
          console.log(Array.isArray(guards));
          const methodParams = params.filter(({ methodName }) => methodName === name);
          const validatorsMiddleware = this.createValidationMiddleware(validators);
          const guardsMiddleware = this.createGuardsMiddleware(guards, module, servicesList);
          const expressHandler = this.createHandler(handler.bind(controller.instance), methodParams);
          this.app[method](`/${controller.path}/${path}`, guardsMiddleware, validatorsMiddleware, ...middlewares, expressHandler);
        });
      })
    });
  }

  private createHandler(method: Function, params: any[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const args = this.createArgs(req, res, next, params);
        const result = await method(...args);
        res.send(result);
      } catch (e) {
        console.log(e);
        next(e);
      }
    }
  }

  private createArgs(req: Request, res: Response, next: NextFunction, params: PARAM[]): any[] {
    if(!params || !params.length) {
      return [req, res, next];
    }

    return params.map(({ type, paramName }) => {
      switch (type) {
        case PARAMS_TYPES.params:
          const param = req.params[paramName];
          if(!isNaN(Number(param))) {
            return Number(param);
          } else {
            return param;
          }

        case PARAMS_TYPES.headers:
          return req.headers[paramName];

        case PARAMS_TYPES.body:
          return req.body;
      }
    });
  }

  private createValidationMiddleware(validatorTypes: any[]): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        validatorTypes.forEach((Type: any) => {
          const validator = new Type();
          const params = Reflect.getMetadata(METADATA_KEY.controllerParams, Type);
          const args = this.createArgs(req, res, next, params);
          validator.validate(...args);
        });
        next();
      } catch (e) {
        res.status(400).json({ error: e.message });
      }
    }
  }

  private createGuardsMiddleware(guardTypes: GuardCreator[], module: any, serviceTypes): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
          console.log(guardTypes);
          guardTypes.forEach((guardType: GuardCreator) => {
              const guard = Injector.resolve(guardType, module, serviceTypes) as Guard;
              guard.check(req, res, next);
              next();
          });

        } catch (e) {
            res.status(403).json({ error: e.message });
        }
    }
  }
}