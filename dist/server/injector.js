"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var server_1 = require("../server");
function Injectable() {
    return function (target) {
    };
}
exports.Injectable = Injectable;
exports.Injector = new /** @class */ (function () {
    function class_1() {
    }
    class_1.prototype.resolve = function (target, module, serviceTypes) {
        var tokens = Reflect.getMetadata('design:paramtypes', target) || [];
        var moduleServices = Reflect.getMetadata(server_1.MODULE_KEYS.services, module) || {};
        var moduleServicesList = Object.keys(moduleServices).map(function (key) { return moduleServices[key]; });
        var injectors = tokens.map(function (token) {
            var isImportedService = moduleServicesList.find(function (_a) {
                var type = _a.type;
                return type === token;
            });
            if (isImportedService) {
                return isImportedService.instance;
            }
            if (serviceTypes.indexOf(token) !== -1) {
                return exports.Injector.resolve(token, module, serviceTypes);
            }
            throw new TypeError('Type doesn\'t injected');
        });
        return new (target.bind.apply(target, [void 0].concat(injectors)))();
    };
    return class_1;
}());
