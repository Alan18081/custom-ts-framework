import {METADATA_KEY} from '../../../Common/metadata/keys';
import {Container} from 'inversify';

interface ModuleConstructor<T> {
    new(...args): T;
}

export class Provider {
    public static createModule(ModuleConstructor: any): object {
        const container: Container = Reflect.getMetadata(METADATA_KEY.container, ModuleConstructor);

        return container.get(ModuleConstructor);
    }
}