"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Module(config) {
    return function (target) {
        var providers = config.providers || [];
        var controllers = config.controllers || [];
        controllers.forEach(function (constructor) {
            var tokens = Reflect.getMetadata('design:paramtypes', constructor);
            if (tokens && tokens.length) {
                tokens.forEach(function (constructor) {
                    Reflect.defineMetadata(target.name + ":" + constructor.name, constructor, Reflect);
                });
            }
        });
    };
}
exports.Module = Module;
