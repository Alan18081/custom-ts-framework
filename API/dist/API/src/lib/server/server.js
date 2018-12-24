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
const metadata_1 = require("./metadata");
const keys_1 = require("../../../../Common/metadata/keys");
const bodyParser = require("body-parser");
const injector_1 = require("../modules/injector");
class Server {
    constructor(port) {
        this.port = port;
        this.app = express();
        this.app.use(bodyParser.json());
        this.registerControllers();
    }
    run() {
        this.app.listen(this.port, () => {
            console.log(`Server is listening on port ${this.port}`);
        });
    }
    registerControllers() {
        const modules = Reflect.getMetadata(metadata_1.METADATA_KEY.module, Reflect) || [];
        modules.forEach(({ type }) => {
            const controllers = Reflect.getMetadata(keys_1.MODULE_KEYS.controllers, type) || {};
            const controllersList = Object.keys(controllers).map(key => controllers[key]);
            const servicesList = Reflect.getMetadata(keys_1.MODULE_KEYS.services, type) || {};
            controllersList.forEach(controller => {
                const methods = Reflect.getMetadata(metadata_1.METADATA_KEY.controllerMethod, controller.type) || {};
                const params = Reflect.getMetadata(metadata_1.METADATA_KEY.controllerParams, controller.type);
                const methodsList = Object.keys(methods).map(key => methods[key]);
                methodsList.forEach(({ method, handler, path, middlewares, name, validators, guards }) => {
                    const methodParams = params.filter(({ methodName }) => methodName === name);
                    const guardsMiddleware = this.createGuardsMiddleware(guards, module, servicesList);
                    const expressHandler = this.createHandler(handler.bind(controller.instance), methodParams);
                    this.app[method](`/${controller.path}/${path}`, ...middlewares, expressHandler);
                });
            });
        });
    }
    createHandler(method, params) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const args = this.createArgs(req, res, next, params);
                const result = yield method(...args);
                res.send(result);
            }
            catch (e) {
                console.log(e);
                res.status(e.statusCode).json(e.message);
            }
        });
    }
    createArgs(req, res, next, params) {
        if (!params || !params.length) {
            return [req, res, next];
        }
        return params.map(({ type, paramName }) => {
            switch (type) {
                case metadata_1.PARAMS_TYPES.params:
                    const param = req.params[paramName];
                    if (!isNaN(Number(param))) {
                        return Number(param);
                    }
                    else {
                        return param;
                    }
                case metadata_1.PARAMS_TYPES.headers:
                    return req.headers[paramName];
                case metadata_1.PARAMS_TYPES.body:
                    return req.body;
            }
        });
    }
    createGuardsMiddleware(guardTypes, module, serviceTypes) {
        return (req, res, next) => {
            try {
                guardTypes.forEach((guardType) => {
                    const guard = injector_1.Injector.resolve(guardType, module, serviceTypes);
                    guard.check(req, res, next);
                    next();
                });
            }
            catch (e) {
                res.status(403).json({ error: e.message });
            }
        };
    }
}
exports.Server = Server;
