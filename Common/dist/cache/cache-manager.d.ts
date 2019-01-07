export declare class CacheManager {
    private readonly client;
    constructor(host: string, port: number, db: number);
    private createKey;
    saveValue(namespace: string, key: string, value: any, expireTime: number): Promise<void>;
    getValue(namespace: string, key: string): Promise<any>;
    run(): Promise<void>;
}
