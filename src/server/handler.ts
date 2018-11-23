import { RequestHandler } from 'express-serve-static-core';
import { Validator } from '../helpers';
import { METHODS_LIST } from './interfaces';

export class Handler {

  name: string;
  middlewares: RequestHandler[] = [];
  validators: Validator[] = [];
  path: string = '';
  method: METHODS_LIST;
  handler: Function;
  controller: Function;

  constructor(data: Partial<Handler>) {
    if(data.name) this.name = data.name;
    if(data.path) this.path = data.path;
    if(data.handler) this.handler = data.handler;
    if(data.middlewares) this.middlewares = [...data.middlewares];
    if(data.validators) this.validators = [...data.validators];
    if(data.controller) this.controller = data.controller;
    if(data.method) this.method = data.method;
  }


}