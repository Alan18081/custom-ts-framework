import * as express from 'express';
import {METADATA_KEY, PARAMS_TYPES} from './constants';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { MODULE_KEYS } from '../server';
import { Handler } from './handler';
import { MyNew, Validator } from '../helpers';

export class Server {

  private readonly port: number;
  private readonly app: express.Application;

  constructor(port: number) {
    this.port = port;
    this.app = express();
    this.registerControllers();
  }

  run() {
    this.app.listen(this.port);
  }

  private registerControllers() {
    const modules = Reflect.getMetadata(METADATA_KEY.module, Reflect);

    modules.forEach(({ type }) => {
      const controllers = Reflect.getMetadata(MODULE_KEYS.controllers, type);
      const controllersList = Object.keys(controllers).map(key => controllers[key]);

      controllersList.forEach(controller => {
        const methods = Reflect.getMetadata(METADATA_KEY.controllerMethod, controller.type) || {};
        const params = Reflect.getMetadata(METADATA_KEY.controllerParams, controller.type);

        const methodsList = Object.keys(methods).map(key => methods[key]);

        methodsList.forEach(({ method, handler, path, middlewares, name, validators }: Handler) => {
          // console.log(params);
          const methodParams = params.filter(({ methodName }) => methodName === name);
          const validatorsMiddleware = this.createValidationMiddleware(validators);
          const expressHandler = this.createHandler(handler.bind(controller.instance), methodParams);
          this.app[method](`/${controller.path}/${path}`, ...middlewares, expressHandler);
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

  private createArgs(req, res, next, params) {
    if(!params || !params.length) {
      return [req, res, next];
    }

    return params.map(({ type, paramName }) => {
      switch (type) {
        case PARAMS_TYPES.params:
          return req.params[paramName];

        case PARAMS_TYPES.headers:
          return req.headers[paramName];

        case PARAMS_TYPES.body:
          return req.body[paramName];
      }
    });
  }

  private createValidationMiddleware<T extends MyNew>(validatorTypes: T[]): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        validatorTypes.forEach((Type: T) => {
          const validator = new (Type as MyNew)();
          const params = Reflect.getMetadata(METADATA_KEY.controllerParams, Type);
          const args = this.createArgs(req, res, next, params);
          validator.validate(...args);
        });
      } catch (e) {
        res.status(400).send(e.message);

      }
    }
  }
}