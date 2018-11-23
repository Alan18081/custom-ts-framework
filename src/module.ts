import {Injector} from './injector';
import {MODULE_KEYS} from './server';
import {METADATA_KEY} from './server/constants';

interface ModuleConfig {
  imports: any[];
  services: any[];
  controllers: any[];
  exports: any[];
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
    const importsMetadata = {};
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
      const metadata = {
        name: module.name,
        instance,
        module: moduleConstructor.name,
        type: module
      };

      exportsMetadata[module.name] = metadata;
    });

    services.forEach((service: Function) => {
      const instance = Injector.resolve<any>(service, moduleConstructor, services);
      const metadata = {
        name: service.name,
        instance,
        module: moduleConstructor.name,
        type: service
      };

      servicesMetadata[service.name] = metadata;
    });

    exports.forEach((exports: Function) => {
      const instance = Injector.resolve<any>(exports, moduleConstructor, services);
      const metadata = {
        name: exports.name,
        instance,
        module: moduleConstructor.name,
        type: exports
      };

      exportsMetadata[exports.name] = metadata;
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
    // controllers.forEach((controller: Function) => {
    //   const instance = Injector.resolve<any>(controller, moduleConstructor);
    //   const metadata = {
    //     name: controller.name,
    //     instance,
    //     module: moduleConstructor.name
    //   };
    //
    //   controllersMetadata[controller.name] = metadata;
    // });
    //
    //
    //
    // Reflect.defineMetadata(
    //   MODULE_KEYS.controllers,
    //   controllersMetadata,
    //   moduleConstructor
    // );
    //
    // Reflect.defineMetadata(
    //   MODULE_KEYS.imports,
    //   importsMetadata,
    //   moduleConstructor
    // );
  }
}

