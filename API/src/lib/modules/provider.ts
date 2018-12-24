import { METADATA_KEY } from '../../../../Common/metadata/keys';
import { Container, interfaces } from 'inversify';
import Abstract = interfaces.Abstract;

export class Provider {

  static create<T>(moduleType: Abstract<T>): T {
    const moduleContainer: Container | undefined = Reflect.getMetadata(METADATA_KEY.container, moduleType);

    if(!moduleContainer) {
      throw new Error('Module should be decorated with @Module decorator');
    }

    return moduleContainer.get(moduleType);
  }

}