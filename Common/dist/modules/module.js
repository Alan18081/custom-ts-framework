"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const keys_1 = require("../metadata/keys");
function Module(config) {
    return function (target) {
        const services = config.services || [];
        const controllers = config.controllers || [];
        const imports = config.imports || [];
        const handlers = config.handlers;
        const moduleConstructor = target;
        let moduleContainer = new inversify_1.Container();
        services.forEach((ServiceType) => {
            moduleContainer.bind(ServiceType).to(ServiceType);
        });
        controllers.forEach((ServiceType) => {
            moduleContainer.bind(ServiceType).to(ServiceType).inSingletonScope();
        });
        if (handlers) {
            handlers.forEach((ServiceType) => {
                moduleContainer.bind(ServiceType).to(ServiceType).inSingletonScope();
            });
        }
        imports.forEach(Type => {
            const container = Reflect.getMetadata(keys_1.METADATA_KEY.container, Type);
            moduleContainer = inversify_1.Container.merge(moduleContainer, container);
        });
        if (handlers) {
            let resolvedSubscribersMetadata = {};
            if (!Reflect.hasMetadata(keys_1.METADATA_KEY.resolvedSubscribers, Reflect)) {
                Reflect.defineMetadata(keys_1.METADATA_KEY.resolvedSubscribers, resolvedSubscribersMetadata, Reflect);
            }
            else {
                resolvedSubscribersMetadata = Reflect.getMetadata(keys_1.METADATA_KEY.resolvedSubscribers, Reflect);
            }
            handlers.forEach(HandlerType => {
                const instance = moduleContainer.get(HandlerType);
                const subscribers = Reflect.getMetadata(keys_1.METADATA_KEY.subscribers, HandlerType);
                if (subscribers) {
                    subscribers.forEach((subscriber) => {
                        resolvedSubscribersMetadata[subscriber.code] = Object.assign({}, subscriber, { instance });
                    });
                }
            });
        }
        moduleContainer.bind(target).to(target);
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
