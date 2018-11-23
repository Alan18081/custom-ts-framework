"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var injector_1 = require("./injector");
var server_1 = require("./server");
function Module(config) {
    return function (target) {
        var services = config.services || [];
        var controllers = config.controllers || [];
        var imports = config.imports || [];
        var exports = config.exports || [];
        var moduleConstructor = target;
        var controllersMetadata = {};
        var servicesMetadata = {};
        var importsMetadata = {};
        var exportsMetadata = {};
        imports.forEach(function (module) {
            var exportsServices = Reflect.getMetadata(server_1.MODULE_KEYS.exports, module);
            var exportedServicesList = Object.keys(Reflect.getMetadata(server_1.MODULE_KEYS.exports, module)).map(function (key) { return exportsServices[key]; }) || [];
            exportedServicesList.forEach(function (service) {
                servicesMetadata[service.name] = service;
            });
        });
        Reflect.defineMetadata(server_1.MODULE_KEYS.services, servicesMetadata, moduleConstructor);
        exports.forEach(function (module) {
            var instance = injector_1.Injector.resolve(module, moduleConstructor, Object.keys(servicesMetadata).map(function (key) { return servicesMetadata[key]; }));
            var metadata = {
                name: module.name,
                instance: instance,
                module: moduleConstructor.name,
                type: module
            };
            exportsMetadata[module.name] = metadata;
        });
        services.forEach(function (service) {
            var instance = injector_1.Injector.resolve(service, moduleConstructor, services);
            var metadata = {
                name: service.name,
                instance: instance,
                module: moduleConstructor.name,
                type: service
            };
            servicesMetadata[service.name] = metadata;
        });
        exports.forEach(function (exports) {
            var instance = injector_1.Injector.resolve(exports, moduleConstructor, services);
            var metadata = {
                name: exports.name,
                instance: instance,
                module: moduleConstructor.name,
                type: exports
            };
            exportsMetadata[exports.name] = metadata;
        });
        //
        Reflect.defineMetadata(server_1.MODULE_KEYS.services, servicesMetadata, moduleConstructor);
        Reflect.defineMetadata(server_1.MODULE_KEYS.exports, exportsMetadata, moduleConstructor);
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
    };
}
exports.Module = Module;
