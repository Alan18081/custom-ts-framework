"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
function Injectable() {
    return function (target) {
    };
}
exports.Injectable = Injectable;
exports.Injector = new /** @class */ (function () {
    function class_1() {
    }
    class_1.prototype.resolve = function (target) {
        var tokens = Reflect.getMetadata('design:paramtypes', target) || [];
        var injectors = tokens.map(function (token) { return exports.Injector.resolve(token); });
        return new (target.bind.apply(target, [void 0].concat(injectors)))();
    };
    return class_1;
}());
