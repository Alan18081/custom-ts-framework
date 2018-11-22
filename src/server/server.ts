import * as express from 'express';
import {Injector} from '../injector';
import {METADATA_KEY, PARAMS_TYPES} from './constants';
import {NextFunction, Request, Response} from 'express';

export class Server {

  private port: number;
  private app: express.Application;

  constructor(port: number) {
    this.port = port;
    this.app = express();
    // this.registerControllers();
  }

  run() {
    this.app.listen(this.port);
  }

  private registerControllers() {
    const controllers = Reflect.getMetadata(METADATA_KEY.controller, Reflect);
    console.log(controllers);

    controllers.forEach(controller => {
      const methods = Reflect.getMetadata(METADATA_KEY.controllerMethod, controller.target);
      const params = Reflect.getMetadata(METADATA_KEY.controllerParams, controller.target);

      const instController = Injector.resolve<any>(controller.target, );

      if(methods instanceof Array) {
        methods.forEach(({ method, descriptor, path, middlewares, key }) => {
          const methodParams = params.filter(({ methodName }) => methodName === `${controller.target.name}:${key}`);
          const handler = this.createHandler(descriptor.value.bind(instController), methodParams);
          this.app[method](`/${controller.path}/${path}`, ...middlewares, handler);
        });
      }
    })
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
      }
    });
  }
}