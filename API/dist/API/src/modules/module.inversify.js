"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const keys_1 = require("../../../Common/metadata/keys");
function Module(config) {
    return function (target) {
        const services = config.services || [];
        const controllers = config.controllers || [];
        const imports = config.imports || [];
        const exports = config.exports || [];
        const moduleConstructor = target;
        let moduleContainer = new inversify_1.Container();
        services.forEach((ServiceType) => {
            moduleContainer.bind(ServiceType).to(ServiceType);
        });
        controllers.forEach((ServiceType) => {
            moduleContainer.bind(ServiceType).to(ServiceType).inSingletonScope();
        });
        imports.forEach(Type => {
            const container = Reflect.getMetadata(keys_1.METADATA_KEY.container, Type);
            moduleContainer = inversify_1.Container.merge(moduleContainer, container);
        });
        moduleContainer.bind(target).to(target);
        const controllersMetadata = {};
        controllers.forEach((controller) => {
            const instance = moduleContainer.get(controller);
            const controllerMetadata = Reflect.getMetadata(keys_1.METADATA_KEY.controller, controller);
            if (!controllerMetadata) {
                throw new Error('Each should be decorated by controller function');
            }
            const metadata = Object.assign({ name: controller.name, instance, module: moduleConstructor.name, type: controller }, controllerMetadata);
            controllersMetadata[controller.name] = metadata;
        });
        Reflect.defineMetadata(keys_1.MODULE_KEYS.controllers, controllersMetadata, moduleConstructor);
        let modulesList = [];
        if (!Reflect.hasMetadata(keys_1.METADATA_KEY.module, Reflect)) {
            Reflect.defineMetadata(keys_1.METADATA_KEY.module, modulesList, Reflect);
        }
        else {
            modulesList = Reflect.getMetadata(keys_1.METADATA_KEY.module, Reflect);
        }
        Reflect.defineMetadata(keys_1.METADATA_KEY.container, moduleContainer, moduleConstructor);
        modulesList.push({
            name: moduleConstructor.name,
            type: moduleConstructor,
            container: moduleContainer,
        });
    };
}
exports.Module = Module;
