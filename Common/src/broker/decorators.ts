import 'reflect-metadata';
import {Subscriber} from './interfaces';
import { METADATA_KEY } from '../metadata/keys';
import {BaseDto} from '../dto';

interface SubscriberConfig {
    response: boolean;
}

export function SubscribeMessage(code: string, config: SubscriberConfig = { response: true }) {
    return function (target: any, name: string, descriptor: PropertyDescriptor) {
        const subscriber: Subscriber = {
            code,
            handler: descriptor.value,
            withResponse: config.response,
            Validator: Reflect.getMetadata(METADATA_KEY.subscriberValidator, target.constructor),
            cacheInterceptor: Reflect.getMetadata(METADATA_KEY.cacheInterceptor, target.constructor)
        };

        const subscribersMetadata = getSubscribersList(target.constructor);

        subscribersMetadata.push(subscriber);

    }
}


export function Validate<T extends BaseDto>(Validator: T) {
    return function (target: any, name: string, descriptor: PropertyDescriptor) {
        Reflect.defineMetadata(METADATA_KEY.subscriberValidator, Validator, target.constructor);
    }
}

function getSubscribersList(constructor): Subscriber[] {
    let subscribersMetadata = [];

    if(Reflect.hasMetadata(METADATA_KEY.subscribers, constructor)) {
        subscribersMetadata = Reflect.getMetadata(METADATA_KEY.subscribers, constructor);
    } else {
        Reflect.defineMetadata(METADATA_KEY.subscribers, subscribersMetadata, constructor);
    }

    return subscribersMetadata;
}