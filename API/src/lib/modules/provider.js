"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const keys_1 = require("../../../../Common/metadata/keys");
class Provider {
    static create(moduleType) {
        const moduleContainer = Reflect.getMetadata(keys_1.METADATA_KEY.container, moduleType);
        if (!moduleContainer) {
            throw new Error('Module should be decorated with @Module decorator');
        }
        return moduleContainer.get(moduleType);
    }
}
exports.Provider = Provider;
