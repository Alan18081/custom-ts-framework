"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const IORedis = require("ioredis");
class CacheManager {
    constructor(host, port, db) {
        this.client = new IORedis({
            host,
            port,
            db
        });
    }
    createKey(namespace, key) {
        return `${namespace}:${key}`;
    }
    saveValue(namespace, key, value, expireTime) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.setex(this.createKey(namespace, key), expireTime, JSON.stringify(value));
        });
    }
    getValue(namespace, key) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rawData = yield this.client.get(this.createKey(namespace, key));
                if (!rawData) {
                    return false;
                }
                return JSON.parse(rawData);
            }
            catch (e) {
                console.log('[Redis] Failed get cached data', e);
            }
        });
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.connect();
                console.log('[Redis] Connection established');
            }
            catch (e) {
                console.log('[Redis] Failed to connect', e);
            }
        });
    }
}
exports.CacheManager = CacheManager;
