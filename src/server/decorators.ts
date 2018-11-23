import { METADATA_KEY, PARAMS_TYPES } from './constants';
import {RequestHandler} from 'express';
import { MODULE_KEYS } from '../server';

export function Controller(path: string, ...middlewares: Function[]) {
  return function (target: any) {
    const metadata = {
      path,
      middlewares
    };

    Reflect.defineMetadata(METADATA_KEY.controller, metadata, target);
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
      methodName: `${target.constructor.name}:${name}`,
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