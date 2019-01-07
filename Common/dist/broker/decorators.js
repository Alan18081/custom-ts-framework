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
            Validator: Reflect.getMetadata(keys_1.METADATA_KEY.subscriberValidator, target.constructor),
            cacheInterceptor: Reflect.getMetadata(keys_1.METADATA_KEY.cacheInterceptor, target.constructor)
        };
        const subscribersMetadata = getSubscribersList(target.constructor);
        subscribersMetadata.push(subscriber);
    };
}
exports.SubscribeMessage = SubscribeMessage;
function Validate(Validator) {
    return function (target, name, descriptor) {
        Reflect.defineMetadata(keys_1.METADATA_KEY.subscriberValidator, Validator, target.constructor);
    };
}
exports.Validate = Validate;
function getSubscribersList(constructor) {
    let subscribersMetadata = [];
    if (Reflect.hasMetadata(keys_1.METADATA_KEY.subscribers, constructor)) {
        subscribersMetadata = Reflect.getMetadata(keys_1.METADATA_KEY.subscribers, constructor);
    }
    else {
        Reflect.defineMetadata(keys_1.METADATA_KEY.subscribers, subscribersMetadata, constructor);
    }
    return subscribersMetadata;
}
