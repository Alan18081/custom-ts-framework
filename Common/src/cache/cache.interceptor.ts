import {CacheManager} from './cache-manager';

export class CacheInterceptor {

    constructor(
       private readonly client: CacheManager,
       private readonly namespace: string,
       private readonly expiresTime: number
    ) {}

    async save(key: string, payload: any): Promise<void> {
        await this.client.saveValue(this.namespace, key, payload, this.expiresTime);
    }

    async get(key: string): Promise<any> {
        return await this.client.getValue(this.namespace, key);
    }
}