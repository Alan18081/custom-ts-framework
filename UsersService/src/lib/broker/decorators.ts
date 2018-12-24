import {Subscriber} from './metadata';
import { METADATA_KEY } from '../../../../Common/metadata/keys';

interface SubscriberConfig {
    response: boolean;
}

export function SubscribeMessage(code: string, config: SubscriberConfig = { response: true }) {
    return function (target: any, name: string, descriptor: PropertyDescriptor) {
        const subscriber: Subscriber = {
            code,
            handler: descriptor.value,
            withResponse: config.response,
        };

        let subscribersMetadata = [];

        if(Reflect.hasMetadata(METADATA_KEY.subscribers, target.constructor)) {
            subscribersMetadata = Reflect.getMetadata(METADATA_KEY.subscribers, target.constructor);
        } else {
            Reflect.defineMetadata(METADATA_KEY.subscribers, subscribersMetadata, target.constructor);
        }

        subscribersMetadata.push(subscriber);

    }
}