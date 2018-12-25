import * as express from 'express';
import 'reflect-metadata';
import {METADATA_KEY, PARAMS_TYPES} from '../metadata/keys';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { MODULE_KEYS } from '../metadata/keys';
import { Handler } from './handler';
import * as bodyParser from 'body-parser';
import {PARAM} from './interfaces';
import {GuardCreator} from "./guards-decorators";
import { Container } from 'inversify';

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
      const controllers = Reflect.getMetadata(MODULE_KEYS.controllers, type) || {};
      const controllersList = Object.keys(controllers).map(key => controllers[key]);
      const container = Reflect.getMetadata(METADATA_KEY.container, type);

      controllersList.forEach(controller => {
        const methods = Reflect.getMetadata(METADATA_KEY.controllerMethod, controller.type) || {};
        const params = Reflect.getMetadata(METADATA_KEY.controllerParams, controller.type);

        const methodsList = Object.keys(methods).map(key => methods[key]);

        methodsList.forEach(({ method, handler, path, middlewares, name, validators, guards }: Handler) => {
          const methodParams = params.filter(({ methodName }) => methodName === name);
           const guardsMiddleware = this.createGuardsMiddleware(guards, container);
          const expressHandler = this.createHandler(handler.bind(controller.instance), methodParams);
          this.app[method](`/${controller.path}/${path}`, guardsMiddleware, ...middlewares, expressHandler);
        });
      })
    });
  }

  private createHandler(method: Function, params: any[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const args = this.createArgs(req, res, next, params);
        const result = await method(...args);
        if(result.isError) {
            res.status(result.statusCode).json(result.payload);
        } else {
            res.send(result);
        }
      } catch (e) {
        console.log(e);
        res.status(e.statusCode).json(e.message);
      }
    }
  }

  private createArgs(req: Request, res: Response, next: NextFunction, params: PARAM[]): any[] {
    if(!params || !params.length) {
      return [req, res, next];
    }

    return params.map(({ type, paramName = '' }) => {
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

        case PARAMS_TYPES.query:
          return req.query;
      }
    });
  }

  private createGuardsMiddleware(guardTypes: GuardCreator[], container: Container): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
          guardTypes.forEach((guardType: GuardCreator) => {
              const guard = container.get(guardType);
              guard.check(req, res, next);
              next();
          });

        } catch (e) {
          console.log(e);
          res.status(403).json({ error: e.message });
        }
    }
  }
}