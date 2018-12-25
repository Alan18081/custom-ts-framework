"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const injector_1 = require("./common/server/injector");
const server_1 = require("./server");
const constants_1 = require("./common/server/constants");
function Module(config) {
    return function (target) {
        const services = config.services || [];
        const controllers = config.controllers || [];
        const imports = config.imports || [];
        const exports = config.exports || [];
        const moduleConstructor = target;
        const controllersMetadata = {};
        const servicesMetadata = {};
        const exportsMetadata = {};
        imports.forEach((module) => {
            const exportsServices = Reflect.getMetadata(server_1.MODULE_KEYS.exports, module);
            const exportedServicesList = Object.keys(Reflect.getMetadata(server_1.MODULE_KEYS.exports, module)).map(key => exportsServices[key]) || [];
            exportedServicesList.forEach((service) => {
                servicesMetadata[service.name] = service;
            });
        });
        Reflect.defineMetadata(server_1.MODULE_KEYS.services, servicesMetadata, moduleConstructor);
        exports.forEach((module) => {
            const instance = injector_1.Injector.resolve(module, moduleConstructor, Object.keys(servicesMetadata).map(key => servicesMetadata[key]));
            const metadata = {
                name: module.name,
                instance,
                module: moduleConstructor.name,
                type: module
            };
            exportsMetadata[module.name] = metadata;
        });
        services.forEach((service) => {
            const instance = injector_1.Injector.resolve(service, moduleConstructor, services);
            const metadata = {
                name: service.name,
                instance,
                module: moduleConstructor.name,
                type: service
            };
            servicesMetadata[service.name] = metadata;
        });
        //
        Reflect.defineMetadata(server_1.MODULE_KEYS.services, servicesMetadata, moduleConstructor);
        Reflect.defineMetadata(server_1.MODULE_KEYS.exports, exportsMetadata, moduleConstructor);
        //
        controllers.forEach((controller) => {
            const instance = injector_1.Injector.resolve(controller, moduleConstructor, services);
            const controllerMetadata = Reflect.getMetadata(constants_1.METADATA_KEY.controller, controller);
            if (!controllerMetadata) {
                throw new Error('Each should be decorated by controller function');
            }
            const metadata = Object.assign({ name: controller.name, instance, module: moduleConstructor.name, type: controller }, controllerMetadata);
            controllersMetadata[controller.name] = metadata;
        });
        Reflect.defineMetadata(server_1.MODULE_KEYS.controllers, controllersMetadata, moduleConstructor);
        let modulesList = [];
        if (!Reflect.hasMetadata(constants_1.METADATA_KEY.module, Reflect)) {
            Reflect.defineMetadata(constants_1.METADATA_KEY.module, modulesList, Reflect);
        }
        else {
            modulesList = Reflect.getMetadata(constants_1.METADATA_KEY.module, Reflect);
        }
        modulesList.push({
            name: moduleConstructor.name,
            type: moduleConstructor
        });
    };
}
exports.Module = Module;
