"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const keys_1 = require("../metadata/keys");
function SubscribeMessage(code, config = { response: true }) {
    return function (target, name, descriptor) {
        const subscriber = {
            code,
            handler: descriptor.value,
            withResponse: config.response,
        };
        let subscribersMetadata = [];
        if (Reflect.hasMetadata(keys_1.METADATA_KEY.subscribers, target.constructor)) {
            subscribersMetadata = Reflect.getMetadata(keys_1.METADATA_KEY.subscribers, target.constructor);
        }
        else {
            Reflect.defineMetadata(keys_1.METADATA_KEY.subscribers, subscribersMetadata, target.constructor);
        }
        subscribersMetadata.push(subscriber);
    };
}
exports.SubscribeMessage = SubscribeMessage;
