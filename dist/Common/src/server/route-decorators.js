"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const keys_1 = require("../metadata/keys");
const route_params_decorators_1 = require("./route-params.decorators");
function Controller(path) {
    return function (target) {
        const metadata = {
            path
        };
        Reflect.defineMetadata(keys_1.METADATA_KEY.controller, metadata, target);
    };
}
exports.Controller = Controller;
function Get(path) {
    return RouteMethod(keys_1.METHODS.get, path);
}
exports.Get = Get;
function Post(path) {
    return RouteMethod(keys_1.METHODS.post, path);
}
exports.Post = Post;
function Put(path) {
    return RouteMethod(keys_1.METHODS.put, path);
}
exports.Put = Put;
function Delete(path) {
    return RouteMethod(keys_1.METHODS.delete, path);
}
exports.Delete = Delete;
function RouteMethod(method, path) {
    return function (target, name, descriptor) {
        const handler = route_params_decorators_1.getHandler(target, name, descriptor);
        handler.method = method;
        handler.path = path;
    };
}
