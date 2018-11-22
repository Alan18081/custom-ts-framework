import 'reflect-metadata';
import {MODULE_KEYS} from './server';


export function Injectable() {
  return function (target: any) {
    
  }
}

export const Injector = new class {
  resolve<T>(target: any, module: any, services: any[]): T {
    const tokens = Reflect.getMetadata('design:paramtypes', target) || [];
    const moduleServices = Reflect.getMetadata(MODULE_KEYS.services, module) || []

    const injectors = tokens.map(token => {
      if(services.indexOf(token) === -1) {
        console.log(services, token);
        throw new TypeError('Type doesn\'t injected');
      }
      if(services[token.name]) {
        return services[token.name].instance;
      }
      return Injector.resolve<any>(token, module, services);
    });

    return new target(...injectors);
  }
};