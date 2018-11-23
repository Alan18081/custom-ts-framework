"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Handler = /** @class */ (function () {
    function Handler(data) {
        this.middlewares = [];
        this.validators = [];
        this.path = '';
        if (data.name)
            this.name = data.name;
        if (data.path)
            this.path = data.path;
        if (data.handler)
            this.handler = data.handler;
        if (data.middlewares)
            this.middlewares = data.middlewares.slice();
        if (data.validators)
            this.validators = data.validators.slice();
        if (data.controller)
            this.controller = data.controller;
        if (data.method)
            this.method = data.method;
    }
    return Handler;
}());
exports.Handler = Handler;
