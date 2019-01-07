import * as IORedis from 'ioredis';
import { Redis } from 'ioredis';

export class CacheManager {
    private readonly client: Redis;

    constructor(host: string, port: number, db: number) {
        this.client = new IORedis({
            host,
            port,
            db
        });
    }

    private createKey(namespace: string, key: string): string {
        return `${namespace}:${key}`;
    }

    async saveValue(namespace: string, key: string, value: any, expireTime: number): Promise<void> {
        await this.client.setex(this.createKey(namespace, key), expireTime, JSON.stringify(value));
    }

    async getValue(namespace: string, key: string): Promise<any> {
        try {
            const rawData = await this.client.get(this.createKey(namespace, key));
            if(!rawData) {
                return false;
            }
            return JSON.parse(rawData);
        } catch (e) {
            console.log('[Redis] Failed get cached data', e);
        }
    }

    async run(): Promise<void> {
        try {
            await this.client.connect();
            console.log('[Redis] Connection established');
        } catch (e) {
            console.log('[Redis] Failed to connect', e);
        }
    }
}