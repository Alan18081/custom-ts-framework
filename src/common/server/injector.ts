import 'reflect-metadata';
import {METADATA_KEY, MODULE_KEYS} from '../../server';
import {Service} from "./interfaces";

export function Injectable() {
  return function (target: any) {
    
  }
}

export const Injector = new class {
  resolve<T>(target: any, module: any, serviceTypes: any[]): T {
    const tokens = Reflect.getMetadata('design:paramtypes', target) || [];
    const moduleServices = Reflect.getMetadata(MODULE_KEYS.services, module) || {};

    const moduleServicesList: Service<T>[] = Object.keys(moduleServices).map(key => moduleServices[key]);

    const injectors = tokens.map((token) => {
      const isImportedService = moduleServicesList.find(({ type }) => type === token);
      if(isImportedService) {
        return isImportedService.instance;
      }

      if(serviceTypes[token.name]) {
        return Injector.resolve<any>(token, module, serviceTypes);
      }

      throw new TypeError('Type doesn\'t injected');
    });

    return new target(injectors);
  }
};