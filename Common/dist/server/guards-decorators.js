"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const route_params_decorators_1 = require("./route-params.decorators");
function UseGuards(...guards) {
    return function (target, name, descriptor) {
        const handler = route_params_decorators_1.getHandler(target, name, descriptor);
        handler.guards = [...handler.guards, ...guards];
    };
}
exports.UseGuards = UseGuards;
