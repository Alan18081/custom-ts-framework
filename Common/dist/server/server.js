"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
require("reflect-metadata");
const http_status_codes_1 = require("http-status-codes");
const keys_1 = require("../metadata/keys");
const keys_2 = require("../metadata/keys");
const bodyParser = require("body-parser");
const lodash_1 = require("lodash");
const passport = require("passport");
class Server {
    constructor(port) {
        this.port = port;
        this.app = express();
        this.app.use(bodyParser.json());
        this.app.use(passport.initialize());
        this.registerControllers();
    }
    run() {
        this.app.listen(this.port, () => {
            console.log(`Server is listening on port ${this.port}`);
        });
    }
    registerControllers() {
        const modules = Reflect.getMetadata(keys_1.METADATA_KEY.module, Reflect) || [];
        modules.forEach(({ type }) => {
            const controllers = Reflect.getMetadata(keys_2.MODULE_KEYS.controllers, type) || {};
            const controllersList = Object.keys(controllers).map(key => controllers[key]);
            const container = Reflect.getMetadata(keys_1.METADATA_KEY.container, type);
            controllersList.forEach(controller => {
                const controllerMetadata = Reflect.getMetadata(keys_1.METADATA_KEY.controller, controller.type);
                const methods = Reflect.getMetadata(keys_1.METADATA_KEY.controllerMethod, controller.type) || {};
                const params = Reflect.getMetadata(keys_1.METADATA_KEY.controllerParams, controller.type);
                const instance = container.get(controller.type);
                const methodsList = Object.keys(methods).map(key => methods[key]);
                methodsList.forEach(({ method, handler, path, middlewares, name, validators, guards }) => {
                    const methodParams = params.filter(({ methodName }) => methodName === name);
                    const guardsMiddlewares = this.createGuardsMiddleware(guards, container);
                    const expressHandler = this.createHandler(handler.bind(instance), methodParams);
                    this.app[method](`/${controllerMetadata.path}/${path}`, ...guardsMiddlewares, ...middlewares, expressHandler);
                });
            });
        });
    }
    createHandler(method, params) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const args = this.createArgs(req, res, next, params);
                const result = yield method(...args);
                if (result && result.isError) {
                    res.status(result.statusCode).json(result.payload);
                }
                else {
                    res.send(result);
                }
            }
            catch (e) {
                console.log(e);
                res.status(e.statusCode || http_status_codes_1.INTERNAL_SERVER_ERROR).json(e.message);
            }
        });
    }
    createArgs(req, res, next, params) {
        if (!params || !params.length) {
            return [req, res, next];
        }
        return params.map(({ type, paramName = '' }) => {
            switch (type) {
                case keys_1.PARAMS_TYPES.params:
                    const param = req.params[paramName];
                    if (!isNaN(Number(param))) {
                        return Number(param);
                    }
                    else {
                        return param;
                    }
                case keys_1.PARAMS_TYPES.headers:
                    return req.headers[paramName];
                case keys_1.PARAMS_TYPES.body:
                    return req.body;
                case keys_1.PARAMS_TYPES.query:
                    return req.query;
                case keys_1.PARAMS_TYPES.queryField:
                    return req.query[paramName];
                case keys_1.PARAMS_TYPES.user:
                    return req.user;
                case keys_1.PARAMS_TYPES.project:
                    return req.project;
            }
        });
    }
    createGuardsMiddleware(guardTypes, container) {
        return guardTypes.map((guardType) => {
            let guard;
            if (lodash_1.isFunction(guardType)) {
                guard = container.get(guardType);
            }
            else {
                guard = guardType;
            }
            return (req, res, next) => {
                try {
                    guard.check.call(guard, req, res, next);
                }
                catch (e) {
                    console.log(e);
                    res.status(e.statusCode).json(e);
                }
            };
        });
    }
}
exports.Server = Server;
