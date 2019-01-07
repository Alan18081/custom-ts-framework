import {CacheInterceptor} from './cache.interceptor';
import { METADATA_KEY } from '..';

export function Cached(cacheInterceptor: CacheInterceptor): MethodDecorator {
    return function (target: any, name: string, descriptor: PropertyDescriptor) {
        Reflect.defineMetadata(METADATA_KEY.cacheInterceptor, cacheInterceptor, target.constructor);
    }
}