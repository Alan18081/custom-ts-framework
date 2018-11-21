import 'reflect-metadata';
import * as express from 'express';
import { Request, Response, NextFunction, RequestHandler } from 'express';

const METADATA_KEY = {
  controller: 'ioc:controller',
  controllerMethod: 'ioc:controller-method',
  controllerParams: 'ioc:controller-params',
  controllerMiddlewares: 'ioc:controller-middlewares'
};

const PARAMS_TYPES = {
  params: 'params',
  headers: 'headers'
};

// const app = express();

function Controller(path: string, ...middleware: Function[]) {
  return function (target: any) {
    const metadata = {
      path,
      middleware,
      target
    };

    const prevMetadata = Reflect.getMetadata(METADATA_KEY.controller, Reflect) || [];

    const currentMetadata = [metadata, ...prevMetadata];

    Reflect.defineMetadata(METADATA_KEY.controller, currentMetadata, Reflect);

  }
}

function Get(path: string, ...middlewares: RequestHandler[]) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const metadata = {
      key,
      method: 'get',
      path,
      target,
      descriptor,
      middlewares
    };

    let metadataList = [];

    if(!Reflect.hasMetadata(METADATA_KEY.controllerMethod, target.constructor)) {
      Reflect.defineMetadata(METADATA_KEY.controllerMethod, metadataList, target.constructor);
    } else {
      metadataList = Reflect.getMetadata(METADATA_KEY.controllerMethod, target.constructor);
    }

    metadataList.push(metadata);
  }
}

function RouteParams(type: string, paramName: string) {
  return function (target: any, name: string, index: number) {
    const metadata = {
      index,
      type,
      paramName
    };

    let metadataList = [];

    if(!Reflect.hasMetadata(METADATA_KEY.controllerParams, target.constructor)) {
      Reflect.defineMetadata(METADATA_KEY.controllerParams, metadataList, target.constructor);
    } else {
      metadataList = Reflect.getMetadata(METADATA_KEY.controllerParams, target.constructor);
    }

    metadataList.unshift(metadata);
  }
}

function Param(name: string) {
  return RouteParams(PARAMS_TYPES.params, name);
}

function Headers(name: string) {
  return RouteParams(PARAMS_TYPES.headers, name);
}

@Controller('users')
class Item {

  @Get('list/:id', (req, res, next) => {
    console.log(req.method);
    next();
  })
  async getUsers(@Headers('authorization') token: string, @Param('id') id: number) {
    console.log('From route', id);
    console.log('From route: token', token);
  }

  @Get('mark/:id')
  async getMark(@Param('id') id: number) {
    console.log('From second route', id);
  }
}

@Controller('products')
class Item2 {

  // @Get('')
  // async getUsers() {
  //
  // }
}

const app = express();

const controllers = Reflect.getMetadata(METADATA_KEY.controller, Reflect);

controllers.forEach(controller => {
  const methods = Reflect.getMetadata(METADATA_KEY.controllerMethod, controller.target);
  const params = Reflect.getMetadata(METADATA_KEY.controllerParams, controller.target);
  const middlewares = Reflect.getMetadata(METADATA_KEY.controllerMiddlewares, controller.target);

  if(methods instanceof Array) {
    methods.forEach(({ method, descriptor, path, middlewares }) => {
      const handler = createHandler(descriptor, params);
      app[method](`/${controller.path}/${path}`, ...middlewares, handler);
    });

  }


});

function createHandler(descriptor: PropertyDescriptor, params: any[]) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      const args = createArgs(req, res, next, params);
      const result = await descriptor.value(...args);
      res.send(result);
    } catch (e) {
      next(e);
    }
  }
}

function createArgs(req, res, next, params) {
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

app.listen(3000, () => {
  console.log('Listening');
});