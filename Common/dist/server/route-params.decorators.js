"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const keys_1 = require("../metadata/keys");
const handler_1 = require("./handler");
function RouteParams(type, paramName) {
    return function (target, name, index) {
        const metadata = {
            methodName: name,
            index,
            type,
            paramName,
        };
        let metadataList = [];
        if (!Reflect.hasMetadata(keys_1.METADATA_KEY.controllerParams, target.constructor)) {
            Reflect.defineMetadata(keys_1.METADATA_KEY.controllerParams, metadataList, target.constructor);
        }
        else {
            metadataList = Reflect.getMetadata(keys_1.METADATA_KEY.controllerParams, target.constructor);
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
    return RouteParams(keys_1.PARAMS_TYPES.params, name);
}
exports.Param = Param;
function Headers(name) {
    return RouteParams(keys_1.PARAMS_TYPES.headers, name);
}
exports.Headers = Headers;
function Body() {
    return RouteParams(keys_1.PARAMS_TYPES.body);
}
exports.Body = Body;
function Query(name) {
    if (name) {
        return RouteParams(keys_1.PARAMS_TYPES.queryField, name);
    }
    return RouteParams(keys_1.PARAMS_TYPES.query);
}
exports.Query = Query;
function ReqUser() {
    return RouteParams(keys_1.PARAMS_TYPES.user);
}
exports.ReqUser = ReqUser;
function Project() {
    return RouteParams(keys_1.PARAMS_TYPES.project);
}
exports.Project = Project;
function ProjectAccount() {
    return RouteParams(keys_1.PARAMS_TYPES.projectAccount);
}
exports.ProjectAccount = ProjectAccount;
function getHandler(target, name, descriptor) {
    let methods = {};
    if (!Reflect.hasMetadata(keys_1.METADATA_KEY.controllerMethod, target.constructor)) {
        Reflect.defineMetadata(keys_1.METADATA_KEY.controllerMethod, methods, target.constructor);
    }
    else {
        methods = Reflect.getMetadata(keys_1.METADATA_KEY.controllerMethod, target.constructor);
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
