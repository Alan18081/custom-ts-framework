import { getHandler } from '../server/route-params.decorators';
import { Validator } from '../helpers';

export function UseValidator(...validators: any[]) {
  return function (target: any, name: string, descriptor: PropertyDescriptor) {
    const method = getHandler(target, name, descriptor);
    method.validators.concat(validators);
  }
}