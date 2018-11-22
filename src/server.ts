import { RequestHandler } from 'express';

export const METADATA_KEY = {
  controller: 'ioc:controller',
  controllerMethod: 'ioc:controller-method',
  controllerParams: 'ioc:controller-params',
  controllerMiddlewares: 'ioc:controller-middlewares',
  module: 'ioc:module',
  service: 'ioc:service'
};

export const PARAMS_TYPES = {
  params: 'params',
  headers: 'headers'
};

// const app = express();

export function Controller(path: string, ...middleware: Function[]) {
  return function (target: any) {
    console.log('Hey');
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

export function Get(path: string, ...middlewares: RequestHandler[]) {
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

export function Param(name: string) {
  return RouteParams(PARAMS_TYPES.params, name);
}

export function Headers(name: string) {
  return RouteParams(PARAMS_TYPES.headers, name);
}
