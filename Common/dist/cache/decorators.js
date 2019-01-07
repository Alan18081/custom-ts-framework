"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
function Cached(cacheInterceptor) {
    return function (target, name, descriptor) {
        Reflect.defineMetadata(__1.METADATA_KEY.cacheInterceptor, cacheInterceptor, target.constructor);
    };
}
exports.Cached = Cached;
