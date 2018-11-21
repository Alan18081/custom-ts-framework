"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var http_1 = require("http");
var nodeUrl = require("url");
var handler_1 = require("./handler");
var Server = /** @class */ (function () {
    function Server(port) {
        var _this = this;
        this.handlers = {
            get: {},
            post: {},
            put: {},
            delete: {}
        };
        this.port = port;
        this.server = http_1.default.createServer(function (req, res) {
            var method = req.method ? req.method.toLowerCase() : 'get';
            if (req.url) {
                var url = nodeUrl.parse(req.url);
                if (url.pathname && _this.handlers[method]) {
                    var handlersList = _this.handlers[method];
                    console.log(handlersList);
                    for (var key in handlersList) {
                        if (handlersList.hasOwnProperty(key)) {
                            var handlerObj = handlersList[key];
                            var isValidUrl = handlerObj.isValid(url.pathname);
                            if (isValidUrl) {
                                handlerObj.parseParams(url.pathname);
                                handlerObj.getHandler()(req, res);
                            }
                        }
                    }
                }
            }
        });
    }
    Server.prototype.addHandler = function (method, url, handler) {
        this.handlers[method][url] = new handler_1.Handler(url, handler);
    };
    Server.prototype.run = function () {
        this.server.listen(this.port, function () {
            console.log('Server is running');
        });
    };
    return Server;
}());
exports.server = new Server(4000);
function Controller(url) {
    return function (constructor) {
        console.log('Controller', constructor.prototype);
    };
}
exports.Controller = Controller;
function Param(param) {
    return function (obj, name, index) {
        Object.defineProperty(obj, 'id', { configurable: false, value: index });
    };
}
exports.Param = Param;
function Get(url) {
    return function (target, name, descriptor) {
        var origDescriptor = descriptor.value;
        function handler(req, res) {
            var args = [];
            for (var key in target) {
                if (target.hasOwnProperty(key)) {
                    args[target[key]] = 'Hello';
                }
            }
            return origDescriptor.call.apply(origDescriptor, [this].concat(args));
        }
        exports.server.addHandler('get', url, handler);
        descriptor.value = handler;
    };
}
exports.Get = Get;
