"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
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
        var prevMetadata = Reflect.getMetadata(constants_1.METADATA_KEY.controller, Reflect) || [];
        var currentMetadata = [metadata].concat(prevMetadata);
        Reflect.defineMetadata(constants_1.METADATA_KEY.controller, currentMetadata, Reflect);
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
        if (!Reflect.hasMetadata(constants_1.METADATA_KEY.controllerMethod, target.constructor)) {
            Reflect.defineMetadata(constants_1.METADATA_KEY.controllerMethod, metadataList, target.constructor);
        }
        else {
            metadataList = Reflect.getMetadata(constants_1.METADATA_KEY.controllerMethod, target.constructor);
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
        if (!Reflect.hasMetadata(constants_1.METADATA_KEY.controllerParams, target.constructor)) {
            Reflect.defineMetadata(constants_1.METADATA_KEY.controllerParams, metadataList, target.constructor);
        }
        else {
            metadataList = Reflect.getMetadata(constants_1.METADATA_KEY.controllerParams, target.constructor);
        }
        metadataList.unshift(metadata);
    };
}
function Param(name) {
    return RouteParams(constants_1.PARAMS_TYPES.params, name);
}
exports.Param = Param;
function Headers(name) {
    return RouteParams(constants_1.PARAMS_TYPES.headers, name);
}
exports.Headers = Headers;
