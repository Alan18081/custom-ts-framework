"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
var handler_1 = require("./handler");
function RouteParams(type, paramName) {
    return function (target, name, index) {
        var metadata = {
            methodName: name,
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
function UseMiddlewares() {
    var middlewares = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        middlewares[_i] = arguments[_i];
    }
    return function (target, name, descriptor) {
        var handler = getHandler(target, name, descriptor);
        middlewares.forEach(function (item) { return handler.middlewares.push(item); });
    };
}
exports.UseMiddlewares = UseMiddlewares;
function Param(name) {
    return RouteParams(constants_1.PARAMS_TYPES.params, name);
}
exports.Param = Param;
function Headers(name) {
    return RouteParams(constants_1.PARAMS_TYPES.headers, name);
}
exports.Headers = Headers;
function Body() {
    return RouteParams(constants_1.PARAMS_TYPES.body);
}
exports.Body = Body;
function getHandler(target, name, descriptor) {
    var methods = {};
    if (!Reflect.hasMetadata(constants_1.METADATA_KEY.controllerMethod, target.constructor)) {
        Reflect.defineMetadata(constants_1.METADATA_KEY.controllerMethod, methods, target.constructor);
    }
    else {
        methods = Reflect.getMetadata(constants_1.METADATA_KEY.controllerMethod, target.constructor);
    }
    var methodHandler;
    if (!methods[name]) {
        methodHandler = new handler_1.Handler({
            name: name,
            handler: descriptor.value,
            controller: target.constructor
        });
        methods[name] = methodHandler;
    }
    return methods[name];
}
exports.getHandler = getHandler;
