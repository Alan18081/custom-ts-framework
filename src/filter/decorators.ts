import { getHandler } from '../lib/server/route-params.decorators';

export function UseValidator(...validators: Function[]) {
  return function (target: any, name: string, descriptor: PropertyDescriptor) {
    const method = getHandler(target, name, descriptor);
    method.addValidator(validators);
  }
}