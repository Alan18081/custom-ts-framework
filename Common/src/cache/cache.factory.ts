import {CacheInterceptor} from './cache.interceptor';
import {CacheManager} from './cache-manager';

export function CreateCacheFactory(client: CacheManager) {
    return function (namespace: string, expiresTime: number) {
        return new CacheInterceptor(client, namespace, expiresTime);
    };
}
