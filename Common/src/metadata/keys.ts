export const METADATA_KEY = {
  controller: 'ioc:controller',
  controllerMethod: 'ioc:controller-method',
  controllerParams: 'ioc:controller-params',
  controllerMiddlewares: 'ioc:controller-middlewares',
  module: 'ioc:module',
  service: 'ioc:service',
  repository: 'ioc:repository',
  args: 'ioc:args',
  container: 'ioc:container',
  containerModule: 'ioc:container-module',
  subscribers: 'ioc:subscribers',
  resolvedSubscribers: 'ioc:resolved-subscribers',
  messageHandler: 'ioc:message-handler'
};

export enum METHODS {
  get = 'get',
  post = 'post',
  put = 'put',
  delete = 'delete'
};

export const MODULE_KEYS = {
  controllers: 'module:controllers',
  services: 'module:services',
  imports: 'module:imports',
  exports: 'module:exports'
};

export const PARAMS_TYPES = {
  params: 'params',
  headers: 'headers',
  body: 'body',
  query: 'query',
  queryField: 'queryField',
  user: 'user',
};

