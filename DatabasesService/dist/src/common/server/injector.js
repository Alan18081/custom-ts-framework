"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const server_1 = require("../../server");
function Injectable() {
    return function (target) {
    };
}
exports.Injectable = Injectable;
exports.Injector = new class {
    resolve(target, module, serviceTypes) {
        const tokens = Reflect.getMetadata('design:paramtypes', target) || [];
        const moduleServices = Reflect.getMetadata(server_1.MODULE_KEYS.services, module) || {};
        const moduleServicesList = Object.keys(moduleServices).map(key => moduleServices[key]);
        const injectors = tokens.map((token) => {
            const isImportedService = moduleServicesList.find(({ type }) => type === token);
            if (isImportedService) {
                return isImportedService.instance;
            }
            if (serviceTypes[token.name]) {
                return exports.Injector.resolve(token, module, serviceTypes);
            }
            throw new TypeError('Type doesn\'t injected');
        });
        return new target(injectors);
    }
};
