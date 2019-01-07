import {CacheInterceptor} from '../cache';

export interface Subscriber {
    handler: Function;
    code: string;
    withResponse: boolean;
    Validator: { new(data): any },
    cacheInterceptor?: CacheInterceptor;
}

export interface ResolvedSubscriber extends Subscriber {
    instance: any;
}