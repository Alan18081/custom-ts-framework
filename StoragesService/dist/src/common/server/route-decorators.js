"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const route_params_decorators_1 = require("./route-params.decorators");
function Controller(path) {
    return function (target) {
        const metadata = {
            path
        };
        Reflect.defineMetadata(constants_1.METADATA_KEY.controller, metadata, target);
    };
}
exports.Controller = Controller;
function Get(path) {
    return RouteMethod(constants_1.METHODS.get, path);
}
exports.Get = Get;
function Post(path) {
    return RouteMethod(constants_1.METHODS.post, path);
}
exports.Post = Post;
function Put(path) {
    return RouteMethod(constants_1.METHODS.put, path);
}
exports.Put = Put;
function Delete(path) {
    return RouteMethod(constants_1.METHODS.delete, path);
}
exports.Delete = Delete;
function RouteMethod(method, path) {
    return function (target, name, descriptor) {
        const handler = route_params_decorators_1.getHandler(target, name, descriptor);
        handler.method = method;
        handler.path = path;
    };
}
