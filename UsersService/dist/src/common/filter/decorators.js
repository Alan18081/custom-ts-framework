"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const route_params_decorators_1 = require("../server/route-params.decorators");
function UseValidator(...validators) {
    return function (target, name, descriptor) {
        const method = route_params_decorators_1.getHandler(target, name, descriptor);
        method.addValidator(validators);
    };
}
exports.UseValidator = UseValidator;
