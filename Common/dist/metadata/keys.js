"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.METADATA_KEY = {
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
exports.MODULE_KEYS = {
    controllers: 'module:controllers',
    services: 'module:services',
    imports: 'module:imports',
    exports: 'module:exports'
};
exports.PARAMS_TYPES = {
    params: 'params',
    headers: 'headers',
    body: 'body',
    query: 'query'
};
// const app = express();