import { METADATA_KEY, METHODS } from '../metadata/keys';
import { getHandler } from './route-params.decorators';

export function Controller(path: string) {
  return function (target: any) {
    const metadata = {
      path
    };

    Reflect.defineMetadata(METADATA_KEY.controller, metadata, target);
  }
}

export function Get(path: string) {
  return RouteMethod(METHODS.get, path);
}

export function Post(path: string) {
  return RouteMethod(METHODS.post, path);
}

export function Put(path: string) {
  return RouteMethod(METHODS.put, path);
}

export function Delete(path: string) {
  return RouteMethod(METHODS.delete, path);
}


function RouteMethod(method: METHODS, path: string) {
  return function (target: any, name: string, descriptor: PropertyDescriptor) {
    const handler = getHandler(target, name, descriptor);
    handler.method = method;
    handler.path = path;
  }
}

