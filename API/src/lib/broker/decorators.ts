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
            withResponse: config.response
        };

        let subscribersMetadata = {};

        if(Reflect.hasMetadata(METADATA_KEY.subscribers, Reflect)) {
            subscribersMetadata = Reflect.getMetadata(METADATA_KEY.subscribers, Reflect);
        } else {
            Reflect.defineMetadata(METADATA_KEY.subscribers, subscribersMetadata, Reflect);
        }

        subscribersMetadata[code] = subscriber;

    }
}