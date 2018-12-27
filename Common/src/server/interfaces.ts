import { METHODS, PARAMS_TYPES } from '../metadata/keys';
import { RequestHandler } from 'express-serve-static-core';

export type PARAMS_TYPES_LIST = typeof PARAMS_TYPES[keyof typeof PARAMS_TYPES];
export type METHODS_LIST = typeof METHODS[keyof typeof METHODS];

export interface PARAM {
  methodName: string;
  index: number;
  type: PARAMS_TYPES_LIST;
  paramName?: string;
}

export interface Method {
  key: string;
  method: METHODS_LIST;
  path: string;
  target: any;
  middlewares: RequestHandler[];
  descriptor: PropertyDescriptor;
}

export interface Exports<T> {
  name: string,
  instance: T,
  module: string,
  type: Function
}

export interface Service<T> {
  name: string,
  instance: T,
  module: string,
  type: Function
}