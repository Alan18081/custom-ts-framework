"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Handler {
    constructor(data) {
        this.name = '';
        this.middlewares = [];
        this.validators = [];
        this.guards = [];
        this.path = '';
        this.method = 'GET';
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
    addValidator(validators) {
        this.validators = this.validators.concat(validators);
    }
}
exports.Handler = Handler;
