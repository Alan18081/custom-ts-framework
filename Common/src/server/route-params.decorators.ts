import 'reflect-metadata';
import { PARAM, PARAMS_TYPES_LIST } from './interfaces';
import { METADATA_KEY, PARAMS_TYPES } from '../metadata/keys';
import { RequestHandler } from 'express';
import { Handler } from './handler';

function RouteParams(type: PARAMS_TYPES_LIST, paramName: string): ParameterDecorator;
function RouteParams(type: PARAMS_TYPES_LIST): ParameterDecorator;

function RouteParams(type: PARAMS_TYPES_LIST, paramName?: string) {
  return function (target: any, name: string, index: number) {
    const metadata: PARAM = {
      methodName: name,
      index,
      type,
      paramName,
    };

    let metadataList: PARAM[] = [];

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

export function Param(name: string): ParameterDecorator {
  return RouteParams(PARAMS_TYPES.params, name);
}

export function Headers(name: string) {
  return RouteParams(PARAMS_TYPES.headers, name);
}



export function Body(): ParameterDecorator {
  return RouteParams(PARAMS_TYPES.body);
}

export function Query(name?: string): ParameterDecorator {
  if(name) {
      return RouteParams(PARAMS_TYPES.queryField, name);
  }

  return RouteParams(PARAMS_TYPES.query);
}

export function ReqUser() {
  return RouteParams(PARAMS_TYPES.user);
}

export function UseJwt() {
  return function (target: any, name: string, descriptor: PropertyDescriptor) {
      const handler = getHandler(target, name, descriptor);
      handler.jwt = true;
  }
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