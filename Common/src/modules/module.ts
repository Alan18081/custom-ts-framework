import {Container, interfaces} from 'inversify';
import {METADATA_KEY, MODULE_KEYS} from '../metadata/keys';
import {ResolvedSubscriber, Subscriber} from '../broker/metadata';

interface ModuleConfig {
    imports?: any[];
    services?: any[];
    controllers?: any[];
    exports?: any[];
    handlers?: any[];
}

export function Module(config: ModuleConfig) {
    return function (target: any) {
        const services = config.services || [];
        const controllers = config.controllers || [];
        const imports = config.imports || [];
        const handlers = config.handlers;

        const moduleConstructor = target;

        let moduleContainer: interfaces.Container = new Container({ skipBaseClassChecks: true });

        services.forEach(<T extends { new(...args) }>(ServiceType: T) => {
            moduleContainer.bind<T>(ServiceType).to(ServiceType);
        });

        const controllersMetadata = [];

        controllers.forEach(<T extends { new(...args) }>(ServiceType: T) => {
            moduleContainer.bind<T>(ServiceType).to(ServiceType).inSingletonScope();

            controllersMetadata.push({
               type: ServiceType
            });
        });

        Reflect.defineMetadata(MODULE_KEYS.controllers, controllersMetadata, moduleConstructor);

        if(handlers) {
            handlers.forEach(<T extends { new(...args) }>(ServiceType: T) => {
                moduleContainer.bind<T>(ServiceType).to(ServiceType).inSingletonScope();
            });
        }

        imports.forEach(Type => {
           const container: Container = Reflect.getMetadata(METADATA_KEY.container, Type);
           moduleContainer = Container.merge(moduleContainer, container);
        });

        if(handlers) {
            let resolvedSubscribersMetadata: { [key: string]: ResolvedSubscriber } = {};

            if(!Reflect.hasMetadata(METADATA_KEY.resolvedSubscribers, Reflect)) {
                Reflect.defineMetadata(METADATA_KEY.resolvedSubscribers, resolvedSubscribersMetadata, Reflect);
            } else {
                resolvedSubscribersMetadata = Reflect.getMetadata(METADATA_KEY.resolvedSubscribers, Reflect);
            }

            handlers.forEach(HandlerType => {
                const instance = moduleContainer.get(HandlerType);
                const subscribers = Reflect.getMetadata(METADATA_KEY.subscribers, HandlerType);

                if(subscribers) {
                    subscribers.forEach((subscriber: Subscriber) => {
                        resolvedSubscribersMetadata[subscriber.code] = { ...subscriber, instance };
                    });
                }
            });


        }

        moduleContainer.bind(target).to(target);

        let modulesList = [];

        if(!Reflect.hasMetadata(METADATA_KEY.module, Reflect)) {
            Reflect.defineMetadata(METADATA_KEY.module, modulesList, Reflect);
        } else {
            modulesList = Reflect.getMetadata(METADATA_KEY.module, Reflect);
        }

        Reflect.defineMetadata(METADATA_KEY.container, moduleContainer, moduleConstructor);


        modulesList.push({
            name: moduleConstructor.name,
            type: moduleConstructor,
            container: moduleContainer,
        });
    }
}