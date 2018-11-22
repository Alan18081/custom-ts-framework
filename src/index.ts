import 'reflect-metadata';
import * as express from 'express';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { Injector } from './injector';
import { Controller, Param, Get, Headers, METADATA_KEY, PARAMS_TYPES } from './server';
import { Module } from './module';
import { UsersModule } from './users/users.module';

const userModule = new UsersModule();

@Injectable()
class SomeInject {

  say() {
    console.log('Hello from some injectee');
  }

}





// @Controller('products')
// class Item2 {
//
//   // @Get('')
//   // async getUsers() {
//   //
//   // }
// }

const app = express();

const controllers = Reflect.getMetadata(METADATA_KEY.controller, Reflect);
console.log(controllers);

controllers.forEach(controller => {
  const methods = Reflect.getMetadata(METADATA_KEY.controllerMethod, controller.target);
  const params = Reflect.getMetadata(METADATA_KEY.controllerParams, controller.target);

  const instController = Injector.resolve<any>(controller.target);

  if(methods instanceof Array) {
    methods.forEach(({ method, descriptor, path, middlewares, key }) => {
      const methodParams = params.filter(({ methodName }) => methodName === `${controller.target.name}:${key}`);
      const handler = createHandler(descriptor.value.bind(instController), methodParams);
      app[method](`/${controller.path}/${path}`, ...middlewares, handler);
    });

  }


});

function createHandler(method: Function, params: any[]) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      const args = createArgs(req, res, next, params);
      const result = await method(...args);
      res.send(result);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
}

function createArgs(req, res, next, params) {
  if(!params || !params.length) {
    return [req, res, next];
  }

  console.log('Creating args', params);

  return params.map(({ type, paramName }) => {
    switch (type) {
      case PARAMS_TYPES.params:
        return req.params[paramName];

      case PARAMS_TYPES.headers:
        return req.headers[paramName];
    }
  });
}

function Injectable() {
  return function (target: any) {
    // Reflect.defineMetadata(METADATA_KEY.service, target.constructor)
  }
}

@Injectable()
class SomeOtherInjectable {
  constructor(
    public readonly someInject: SomeInject
  ) {}
}

app.listen(4000, () => {
  console.log('Listening');
});

// const res: SomeOtherInjectable = Injector.resolve<SomeOtherInjectable>(SomeOtherInjectable);
// res.someInject.say();
//
// @Module({
//   providers: [SomeOtherInjectable, SomeInject],
//   controllers: [Item],
// })
// export class MyModule {}

// console.log(Reflect.getMetadataKeys(Reflect))