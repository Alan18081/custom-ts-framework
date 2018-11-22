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
      const exportedServices = Object.values(Reflect.getMetadata(MODULE_KEYS.exports, module)) || [];
      exportedServices.forEach((service: Function) => {
        servicesMetadata[service.name] = service;
      });
    });


    exports.forEach((module: Function) => {
      const instance = Injector.resolve<any>(module, moduleConstructor, services);
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

