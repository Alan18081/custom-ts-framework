function createNameBuilder(type: string): Function {
  return function (module: string, provider: string): string {
    return `${module}-${provider}:${type}`;
  };
}

export const createControllerName = createNameBuilder('controller');
export const createServiceName = createNameBuilder('service');
export const createImportsName = createNameBuilder('imports');
export const createExportsName = createNameBuilder('exports');