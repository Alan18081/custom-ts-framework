"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var route_params_decorators_1 = require("./route-params.decorators");
function UseGuards() {
    var guards = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        guards[_i] = arguments[_i];
    }
    return function (target, name, descriptor) {
        var handler = route_params_decorators_1.getHandler(target, name, descriptor);
        handler.guards = handler.guards.concat(guards);
    };
}
exports.UseGuards = UseGuards;
