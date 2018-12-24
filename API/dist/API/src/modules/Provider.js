"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const keys_1 = require("../../../Common/metadata/keys");
class Provider {
    static createModule(ModuleConstructor) {
        const container = Reflect.getMetadata(keys_1.METADATA_KEY.container, ModuleConstructor);
        return container.get(ModuleConstructor);
    }
}
exports.Provider = Provider;
