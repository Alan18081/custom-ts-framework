import {Handler} from './handler';
export class METHODS {
  public static readonly get = 'get';
  public static readonly post = 'post';
  public static readonly put = 'put';
  public static readonly delete = 'delete';
}

export type METHODS_TYPES = keyof METHODS;

export interface IHandlersList {
  [key: string]: Handler
}