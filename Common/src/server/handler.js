"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const keys_1 = require("../metadata/keys");
class Handler {
    constructor(data) {
        this.name = '';
        this.middlewares = [];
        this.validators = [];
        this.guards = [];
        this.path = '';
        this.method = keys_1.METHODS.get;
        this.controller = () => { };
        if (data.name)
            this.name = data.name;
        if (data.path)
            this.path = data.path;
        if (data.handler)
            this.handler = data.handler;
        if (data.middlewares)
            this.middlewares = [...data.middlewares];
        if (data.validators)
            this.validators = [...data.validators];
        if (data.controller)
            this.controller = data.controller;
        if (data.method)
            this.method = data.method;
    }
}
exports.Handler = Handler;
