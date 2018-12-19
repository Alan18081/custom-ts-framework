import { RequestHandler } from 'express-serve-static-core';
import { Validator } from '../helpers';
import { METHODS_LIST } from './interfaces';
import {Guard, GuardCreator} from "./guards-decorators";

export class Handler {

  name: string;
  middlewares: RequestHandler[] = [];
  validators: Function[] = [];
  guards: GuardCreator[] = [];
  path: string = '';
  method: METHODS_LIST;
  handler: any;
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

  addValidator(validators: Function[]) {
    this.validators = this.validators.concat(validators);
  }
}