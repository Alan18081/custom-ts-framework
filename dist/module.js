"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var injector_1 = require("./injector");
var server_1 = require("./server");
var constants_1 = require("./server/constants");
function Module(config) {
    return function (target) {
        var services = config.services || [];
        var controllers = config.controllers || [];
        var imports = config.imports || [];
        var exports = config.exports || [];
        var moduleConstructor = target;
        var controllersMetadata = {};
        var servicesMetadata = {};
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
        controllers.forEach(function (controller) {
            var instance = injector_1.Injector.resolve(controller, moduleConstructor, services);
            var controllerMetadata = Reflect.getMetadata(constants_1.METADATA_KEY.controller, controller);
            if (!controllerMetadata) {
                throw new Error('Each should be decorated by controller function');
            }
            var metadata = __assign({ name: controller.name, instance: instance, module: moduleConstructor.name, type: controller }, controllerMetadata);
            controllersMetadata[controller.name] = metadata;
        });
        Reflect.defineMetadata(server_1.MODULE_KEYS.controllers, controllersMetadata, moduleConstructor);
        var modulesList = [];
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
