"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.METADATA_KEY = {
    controller: 'ioc:controller',
    controllerMethod: 'ioc:controller-method',
    controllerParams: 'ioc:controller-params',
    controllerMiddlewares: 'ioc:controller-middlewares',
    module: 'ioc:module',
    service: 'ioc:service'
};
exports.PARAMS_TYPES = {
    params: 'params',
    headers: 'headers'
};
// const app = express();
function Controller(path) {
    var middleware = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        middleware[_i - 1] = arguments[_i];
    }
    return function (target) {
        console.log('Hey');
        var metadata = {
            path: path,
            middleware: middleware,
            target: target
        };
        var prevMetadata = Reflect.getMetadata(exports.METADATA_KEY.controller, Reflect) || [];
        var currentMetadata = [metadata].concat(prevMetadata);
        Reflect.defineMetadata(exports.METADATA_KEY.controller, currentMetadata, Reflect);
    };
}
exports.Controller = Controller;
function Get(path) {
    var middlewares = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        middlewares[_i - 1] = arguments[_i];
    }
    return function (target, key, descriptor) {
        var metadata = {
            key: key,
            method: 'get',
            path: path,
            target: target,
            descriptor: descriptor,
            middlewares: middlewares
        };
        var metadataList = [];
        if (!Reflect.hasMetadata(exports.METADATA_KEY.controllerMethod, target.constructor)) {
            Reflect.defineMetadata(exports.METADATA_KEY.controllerMethod, metadataList, target.constructor);
        }
        else {
            metadataList = Reflect.getMetadata(exports.METADATA_KEY.controllerMethod, target.constructor);
        }
        metadataList.push(metadata);
    };
}
exports.Get = Get;
function RouteParams(type, paramName) {
    return function (target, name, index) {
        var metadata = {
            methodName: target.constructor.name + ":" + name,
            index: index,
            type: type,
            paramName: paramName
        };
        var metadataList = [];
        if (!Reflect.hasMetadata(exports.METADATA_KEY.controllerParams, target.constructor)) {
            Reflect.defineMetadata(exports.METADATA_KEY.controllerParams, metadataList, target.constructor);
        }
        else {
            metadataList = Reflect.getMetadata(exports.METADATA_KEY.controllerParams, target.constructor);
        }
        metadataList.unshift(metadata);
    };
}
function Param(name) {
    return RouteParams(exports.PARAMS_TYPES.params, name);
}
exports.Param = Param;
function Headers(name) {
    return RouteParams(exports.PARAMS_TYPES.headers, name);
}
exports.Headers = Headers;
