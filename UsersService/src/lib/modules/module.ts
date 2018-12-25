import {Injector} from './injector';
import {METADATA_KEY, MODULE_KEYS} from '../../../../Common/src/metadata/keys';
import { Exports, Service } from './interfaces';

interface ModuleConfig {
  imports?: any[];
  services?: any[];
  controllers?: any[];
  exports?: any[];
}

export function Module(config: ModuleConfig) {
  return function (target: any) {
    const services = config.services || [];
    const controllers = config.controllers || [];
    const imports = config.imports || [];
    const exports = config.exports || [];
    const moduleConstructor = target;

    const controllersMetadata = {};
    const servicesMetadata = {};
    const exportsMetadata = {};

    imports.forEach((module: Function) => {
      const exportsServices = Reflect.getMetadata(MODULE_KEYS.exports, module);
      const exportedServicesList = Object.keys(Reflect.getMetadata(MODULE_KEYS.exports, module)).map(key => exportsServices[key]) || [];
      exportedServicesList.forEach((service: Function) => {
        servicesMetadata[service.name] = service;
      });
    });

    Reflect.defineMetadata(
      MODULE_KEYS.services,
      servicesMetadata,
      moduleConstructor
    );

    exports.forEach((module: Function) => {
      const instance = Injector.resolve<any>(
        module,
        moduleConstructor,
        Object.keys(servicesMetadata).map(key => servicesMetadata[key]));

      const metadata: Exports<typeof module> = {
        name: module.name,
        instance,
        module: moduleConstructor.name,
        type: module
      };

      exportsMetadata[module.name] = metadata;
    });

    services.forEach((service: Function) => {
      const instance = Injector.resolve<any>(service, moduleConstructor, services);
      const metadata: Service<typeof service> = {
        name: service.name,
        instance,
        module: moduleConstructor.name,
        type: service
      };

      servicesMetadata[service.name] = metadata;
    });

    //
    Reflect.defineMetadata(
      MODULE_KEYS.services,
      servicesMetadata,
      moduleConstructor
    );

    Reflect.defineMetadata(
      MODULE_KEYS.exports,
      exportsMetadata,
      moduleConstructor
    );
    //
    controllers.forEach((controller: Function) => {
      const instance = Injector.resolve<any>(controller, moduleConstructor, services);
      const controllerMetadata = Reflect.getMetadata(METADATA_KEY.controller, controller);

      if(!controllerMetadata) {
        throw new Error('Each should be decorated by controller function');
      }

      const metadata = {
        name: controller.name,
        instance,
        module: moduleConstructor.name,
        type: controller,
        ...controllerMetadata
      };

      controllersMetadata[controller.name] = metadata;
    });

    Reflect.defineMetadata(
      MODULE_KEYS.controllers,
      controllersMetadata,
      moduleConstructor
    );

    let modulesList = [];

    if(!Reflect.hasMetadata(METADATA_KEY.module, Reflect)) {
      Reflect.defineMetadata(METADATA_KEY.module, modulesList, Reflect);
    } else {
      modulesList = Reflect.getMetadata(METADATA_KEY.module, Reflect);
    }

    modulesList.push({
      name: moduleConstructor.name,
      type: moduleConstructor
    });

  }
}

