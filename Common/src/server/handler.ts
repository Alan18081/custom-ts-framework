import { RequestHandler } from 'express-serve-static-core';
import { GuardType } from "./guards-decorators";
import { METHODS } from '../metadata/keys';

export class Handler {

  name: string = '';
  middlewares: RequestHandler[] = [];
  validators: Function[] = [];
  guards: GuardType[] = [];
  path: string = '';
  method: METHODS = METHODS.get;
  handler: any;
  controller: Function = () => {};
  jwt: boolean = false;

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