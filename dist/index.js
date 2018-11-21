"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var express = require("express");
var METADATA_KEY = {
    controller: 'ioc:controller',
    controllerMethod: 'ioc:controller-method',
    controllerParams: 'ioc:controller-params',
    controllerMiddlewares: 'ioc:controller-middlewares'
};
var PARAMS_TYPES = {
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
        var metadata = {
            path: path,
            middleware: middleware,
            target: target
        };
        var prevMetadata = Reflect.getMetadata(METADATA_KEY.controller, Reflect) || [];
        var currentMetadata = [metadata].concat(prevMetadata);
        Reflect.defineMetadata(METADATA_KEY.controller, currentMetadata, Reflect);
    };
}
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
        if (!Reflect.hasMetadata(METADATA_KEY.controllerMethod, target.constructor)) {
            Reflect.defineMetadata(METADATA_KEY.controllerMethod, metadataList, target.constructor);
        }
        else {
            metadataList = Reflect.getMetadata(METADATA_KEY.controllerMethod, target.constructor);
        }
        metadataList.push(metadata);
    };
}
function RouteParams(type, paramName) {
    return function (target, name, index) {
        var metadata = {
            index: index,
            type: type,
            paramName: paramName
        };
        var metadataList = [];
        if (!Reflect.hasMetadata(METADATA_KEY.controllerParams, target.constructor)) {
            Reflect.defineMetadata(METADATA_KEY.controllerParams, metadataList, target.constructor);
        }
        else {
            metadataList = Reflect.getMetadata(METADATA_KEY.controllerParams, target.constructor);
        }
        metadataList.unshift(metadata);
    };
}
function Param(name) {
    return RouteParams(PARAMS_TYPES.params, name);
}
function Headers(name) {
    return RouteParams(PARAMS_TYPES.headers, name);
}
var Item = /** @class */ (function () {
    function Item() {
    }
    Item.prototype.getUsers = function (token, id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log('From route', id);
                console.log('From route: token', token);
                return [2 /*return*/];
            });
        });
    };
    Item.prototype.getMark = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log('From second route', id);
                return [2 /*return*/];
            });
        });
    };
    __decorate([
        Get('list/:id', function (req, res, next) {
            console.log(req.method);
            next();
        }),
        __param(0, Headers('authorization')), __param(1, Param('id')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Number]),
        __metadata("design:returntype", Promise)
    ], Item.prototype, "getUsers", null);
    __decorate([
        Get('mark/:id'),
        __param(0, Param('id')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", Promise)
    ], Item.prototype, "getMark", null);
    Item = __decorate([
        Controller('users')
    ], Item);
    return Item;
}());
var Item2 = /** @class */ (function () {
    function Item2() {
    }
    Item2 = __decorate([
        Controller('products')
    ], Item2);
    return Item2;
}());
var app = express();
var controllers = Reflect.getMetadata(METADATA_KEY.controller, Reflect);
controllers.forEach(function (controller) {
    var methods = Reflect.getMetadata(METADATA_KEY.controllerMethod, controller.target);
    var params = Reflect.getMetadata(METADATA_KEY.controllerParams, controller.target);
    var middlewares = Reflect.getMetadata(METADATA_KEY.controllerMiddlewares, controller.target);
    if (methods instanceof Array) {
        methods.forEach(function (_a) {
            var method = _a.method, descriptor = _a.descriptor, path = _a.path, middlewares = _a.middlewares;
            var handler = createHandler(descriptor, params);
            app[method].apply(app, ["/" + controller.path + "/" + path].concat(middlewares, [handler]));
        });
    }
});
function createHandler(descriptor, params) {
    return function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var args, result, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        args = createArgs(req, res, next, params);
                        return [4 /*yield*/, descriptor.value.apply(descriptor, args)];
                    case 1:
                        result = _a.sent();
                        res.send(result);
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        next(e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
}
function createArgs(req, res, next, params) {
    if (!params || !params.length) {
        return [req, res, next];
    }
    return params.map(function (_a) {
        var type = _a.type, paramName = _a.paramName;
        switch (type) {
            case PARAMS_TYPES.params:
                return req.params[paramName];
            case PARAMS_TYPES.headers:
                return req.headers[paramName];
        }
    });
}
app.listen(3000, function () {
    console.log('Listening');
});
