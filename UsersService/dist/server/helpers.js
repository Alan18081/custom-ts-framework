"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createNameBuilder(type) {
    return function (module, provider) {
        return module + "-" + provider + ":" + type;
    };
}
exports.createControllerName = createNameBuilder('controller');
exports.createServiceName = createNameBuilder('service');
exports.createImportsName = createNameBuilder('imports');
exports.createExportsName = createNameBuilder('exports');
