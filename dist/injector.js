"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var server_1 = require("./server");
function Injectable() {
    return function (target) {
    };
}
exports.Injectable = Injectable;
exports.Injector = new /** @class */ (function () {
    function class_1() {
    }
    class_1.prototype.resolve = function (target, module, services) {
        var tokens = Reflect.getMetadata('design:paramtypes', target) || [];
        var moduleServices = Reflect.getMetadata(server_1.MODULE_KEYS.services, module) || [];
        var injectors = tokens.map(function (token) {
            if (services.indexOf(token) === -1) {
                console.log(services, token);
                throw new TypeError('Type doesn\'t injected');
            }
            if (services[token.name]) {
                return services[token.name].instance;
            }
            return exports.Injector.resolve(token, module, services);
        });
        return new (target.bind.apply(target, [void 0].concat(injectors)))();
    };
    return class_1;
}());
