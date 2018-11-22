import 'reflect-metadata';


export function Injectable() {
  return function (target: any) {
    
  }
}

export const Injector = new class {
  resolve<T>(target: any): T {
    const tokens = Reflect.getMetadata('design:paramtypes', target) || [];
    const injectors = tokens.map(token => Injector.resolve<any>(token));

    return new target(...injectors);
  }
};