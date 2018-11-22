interface ModuleConfig {
  providers: any[];
  controllers: any[];
}

export function Module(config: ModuleConfig) {
  return function (target: any) {
    const providers = config.providers || [];
    const controllers = config.controllers || [];
    controllers.forEach(constructor => {
      const tokens = Reflect.getMetadata('design:paramtypes', constructor);
      if(tokens && tokens.length) {
        tokens.forEach(constructor => {
          Reflect.defineMetadata(`${target.name}:${constructor.name}`, constructor, Reflect);
        });
      }
    });
  }
}