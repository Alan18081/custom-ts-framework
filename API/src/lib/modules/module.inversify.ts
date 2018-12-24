import {Container, interfaces} from 'inversify';
import {METADATA_KEY, MODULE_KEYS} from '../../../../Common/metadata/keys';

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

        let moduleContainer: interfaces.Container = new Container();

        services.forEach(<T extends { new(...args) }>(ServiceType: T) => {
            moduleContainer.bind<T>(ServiceType).to(ServiceType);
        });

        controllers.forEach(<T extends { new(...args) }>(ServiceType: T) => {
            moduleContainer.bind<T>(ServiceType).to(ServiceType).inSingletonScope();
        });



        imports.forEach(Type => {
           const container: Container = Reflect.getMetadata(METADATA_KEY.container, Type);
           moduleContainer = Container.merge(moduleContainer, container);
        });


        moduleContainer.bind(target).to(target);

        const controllersMetadata = {};

        controllers.forEach((controller: Function) => {
            const instance = moduleContainer.get<any>(controller);
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

        Reflect.defineMetadata(METADATA_KEY.container, moduleContainer, moduleConstructor);


        modulesList.push({
            name: moduleConstructor.name,
            type: moduleConstructor,
            container: moduleContainer,
        });
    }
}