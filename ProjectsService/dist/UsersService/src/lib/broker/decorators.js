"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const keys_1 = require("../../../../Common/metadata/keys");
function SubscribeMessage(code, config = { response: true }) {
    return function (target, name, descriptor) {
        const subscriber = {
            code,
            handler: descriptor.value,
            withResponse: config.response
        };
        let subscribersMetadata = {};
        if (Reflect.hasMetadata(keys_1.METADATA_KEY.subscribers, Reflect)) {
            subscribersMetadata = Reflect.getMetadata(keys_1.METADATA_KEY.subscribers, Reflect);
        }
        else {
            Reflect.defineMetadata(keys_1.METADATA_KEY.subscribers, subscribersMetadata, Reflect);
        }
        subscribersMetadata[code] = subscriber;
    };
}
exports.SubscribeMessage = SubscribeMessage;
