import {METHODS, METHODS_TYPES} from './methods';
import {Handler} from './handler';

interface IHandlers {
  [key: string]: Handler
}

export interface IMethods {
  [key:  string]: IHandlers
}
