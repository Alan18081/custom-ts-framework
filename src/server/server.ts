import * as express from 'express';
import {METADATA_KEY, PARAMS_TYPES} from './constants';
import {NextFunction, Request, Response} from 'express';
import { MODULE_KEYS } from '../server';

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
    console.log(modules);

    modules.forEach(({ type }) => {
      const controllers = Reflect.getMetadata(MODULE_KEYS.controllers, type);
      const controllersList = Object.keys(controllers).map(key => controllers[key]);

      controllersList.forEach(controller => {
        const methods = Reflect.getMetadata(METADATA_KEY.controllerMethod, controller.type);
        const params = Reflect.getMetadata(METADATA_KEY.controllerParams, controller.type);

        console.log(controller.instance);

        if(methods instanceof Array) {
          methods.forEach(({ method, descriptor, path, middlewares, key }) => {
            const methodParams = params.filter(({ methodName }) => methodName === `${controller.name}:${key}`);
            const handler = this.createHandler(descriptor.value.bind(controller.instance), methodParams);
            this.app[method](`/${controller.path}/${path}`, ...middlewares, handler);
          });
        }
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
}