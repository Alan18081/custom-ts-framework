import { CacheManager } from './cache-manager';
export declare class CacheInterceptor {
    private readonly client;
    private readonly namespace;
    private readonly expiresTime;
    constructor(client: CacheManager, namespace: string, expiresTime: number);
    save(key: string, payload: any): Promise<void>;
    get(key: string): Promise<any>;
}
