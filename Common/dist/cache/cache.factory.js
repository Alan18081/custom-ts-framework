"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cache_interceptor_1 = require("./cache.interceptor");
function CreateCacheFactory(client) {
    return function (namespace, expiresTime) {
        return new cache_interceptor_1.CacheInterceptor(client, namespace, expiresTime);
    };
}
exports.CreateCacheFactory = CreateCacheFactory;
