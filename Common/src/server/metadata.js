"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.METADATA_KEY = {
    fieldsToUpdate: 'model:fieldsToUpdate',
    controller: 'ioc:controller',
    controllerMethod: 'ioc:controller-method',
    controllerParams: 'ioc:controller-params',
    controllerMiddlewares: 'ioc:controller-middlewares',
    module: 'ioc:module',
    service: 'ioc:service',
    arguments: 'ioc:arguments',
    tables: 'ioc:tables'
};
exports.METHODS = {
    get: 'get',
    post: 'post',
    put: 'put',
    delete: 'delete',
    update: 'update',
    patch: 'patch'
};
exports.PARAMS_TYPES = {
    params: 'params',
    headers: 'headers',
    body: 'body',
    query: 'query',
    queryField: 'queryField'
};
