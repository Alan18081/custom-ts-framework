import 'reflect-metadata';
import http, {IncomingMessage, ServerResponse, Server as HttpServer} from 'http';
import * as nodeUrl from 'url';
import { IMethods } from './interfaces';
import {UrlObjectCommon} from 'url';
import {Handler} from './handler';

class Server {
  private server: HttpServer;
  private port: number;
  private handlers: IMethods = {
    get: {},
    post: {},
    put: {},
    delete: {}
  };

  constructor(port: number) {
    this.port = port;
    this.server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
      const method = req.method ? req.method.toLowerCase() : 'get';

      if(req.url) {
        const url: UrlObjectCommon = nodeUrl.parse(req.url);

        if(url.pathname && this.handlers[method]) {
          const handlersList = this.handlers[method];
          console.log(handlersList);
          for(const key in handlersList) {
            if(handlersList.hasOwnProperty(key)) {
              const handlerObj = handlersList[key];
              const isValidUrl = handlerObj.isValid(url.pathname);
               if(isValidUrl) {
                 handlerObj.parseParams(url.pathname);
                 handlerObj.getHandler()(req, res);
               }
            }
          }
        }
      }

    });
  }

  addHandler(method: string, url: string, handler: Function): void {
    this.handlers[method][url] = new Handler(url, handler);
  }

  run() {
    this.server.listen(this.port, () => {
      console.log('Server is running');
    });
  }
}

export const server = new Server(4000);

export function Controller(url: string) {
  return (constructor: any) => {
    console.log('Controller', constructor.prototype);
  }
}

export function Param(param: string) {
  return (obj: any, name: string, index: string) => {
    Object.defineProperty(obj, 'id', { configurable: false, value: index });
  };
}

export function Get(url: string) {
  return (target: any, name: string, descriptor: PropertyDescriptor) => {
    const origDescriptor = descriptor.value;

    function handler(this: any, req: IncomingMessage, res: ServerResponse) {
      const args = [];
      for(const key in target) {
        if(target.hasOwnProperty(key)) {
          args[target[key]] = 'Hello';
        }
      }
      return origDescriptor.call(this, ...args);
    }

    server.addHandler('get', url, handler);

    descriptor.value = handler;
  }
}