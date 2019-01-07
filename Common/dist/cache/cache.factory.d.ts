import { CacheInterceptor } from './cache.interceptor';
import { CacheManager } from './cache-manager';
export declare function CreateCacheFactory(client: CacheManager): (namespace: string, expiresTime: number) => CacheInterceptor;
