import { PARAM, PARAMS_TYPES_LIST } from './interfaces';
import { METADATA_KEY, PARAMS_TYPES } from './constants';
import { RequestHandler } from 'express';
import { Handler } from './handler';

function RouteParams(type: PARAMS_TYPES_LIST, paramName: string);
function RouteParams(type: PARAMS_TYPES_LIST);

function RouteParams(type: PARAMS_TYPES_LIST, paramName?: string) {
  return function (target: any, name: string, index: number) {
    const metadata: PARAM = {
      methodName: name,
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

export function UseMiddlewares(...middlewares: RequestHandler[]) {
  return function (target: any, name: string, descriptor: PropertyDescriptor) {
    const handler = getHandler(target, name, descriptor);
    middlewares.forEach(item => handler.middlewares.push(item));
  }
}

export function Param(name: string) {
  return RouteParams(PARAMS_TYPES.params, name);
}

export function Headers(name: string) {
  return RouteParams(PARAMS_TYPES.headers, name);
}

export function Body() {
  return RouteParams(PARAMS_TYPES.body);
}

export function getHandler(target: any, name: string, descriptor: PropertyDescriptor): Handler {
  let methods: { [key: string]: Handler } = {};
  if(!Reflect.hasMetadata(METADATA_KEY.controllerMethod, target.constructor)) {
    Reflect.defineMetadata(METADATA_KEY.controllerMethod, methods, target.constructor);
  } else {
    methods = Reflect.getMetadata(METADATA_KEY.controllerMethod, target.constructor)
  }

  let methodHandler: Handler;
  if(!methods[name]) {
    methodHandler = new Handler({
      name,
      handler: descriptor.value,
      controller: target.constructor
    });
    methods[name] = methodHandler;
  }

  return methods[name];

}