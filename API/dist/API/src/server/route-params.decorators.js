"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_1 = require("./metadata");
const handler_1 = require("./handler");
function RouteParams(type, paramName) {
    return function (target, name, index) {
        const metadata = {
            methodName: name,
            index,
            type,
            paramName
        };
        let metadataList = [];
        if (!Reflect.hasMetadata(metadata_1.METADATA_KEY.controllerParams, target.constructor)) {
            Reflect.defineMetadata(metadata_1.METADATA_KEY.controllerParams, metadataList, target.constructor);
        }
        else {
            metadataList = Reflect.getMetadata(metadata_1.METADATA_KEY.controllerParams, target.constructor);
        }
        metadataList.unshift(metadata);
    };
}
function UseMiddlewares(...middlewares) {
    return function (target, name, descriptor) {
        const handler = getHandler(target, name, descriptor);
        middlewares.forEach(item => handler.middlewares.push(item));
    };
}
exports.UseMiddlewares = UseMiddlewares;
function Param(name) {
    return RouteParams(metadata_1.PARAMS_TYPES.params, name);
}
exports.Param = Param;
function Headers(name) {
    return RouteParams(metadata_1.PARAMS_TYPES.headers, name);
}
exports.Headers = Headers;
function Body() {
    return RouteParams(metadata_1.PARAMS_TYPES.body);
}
exports.Body = Body;
function getHandler(target, name, descriptor) {
    let methods = {};
    if (!Reflect.hasMetadata(metadata_1.METADATA_KEY.controllerMethod, target.constructor)) {
        Reflect.defineMetadata(metadata_1.METADATA_KEY.controllerMethod, methods, target.constructor);
    }
    else {
        methods = Reflect.getMetadata(metadata_1.METADATA_KEY.controllerMethod, target.constructor);
    }
    let methodHandler;
    if (!methods[name]) {
        methodHandler = new handler_1.Handler({
            name,
            handler: descriptor.value,
            controller: target.constructor
        });
        methods[name] = methodHandler;
    }
    return methods[name];
}
exports.getHandler = getHandler;
