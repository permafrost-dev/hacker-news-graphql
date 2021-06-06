import { Cache } from './Cache';
const Redis = require('ioredis');

export class RedisCache extends Cache {
    public redis: typeof Redis;

    constructor(keyPrefix = '') {
        super();

        if (keyPrefix.length) {
            keyPrefix += ':';
        }

        this.prefix = keyPrefix;

        this.redis = new Redis(); //{ keyPrefix: keyPrefix });
    }

    public destroy() {
        this.redis.disconnect();
    }

    public async has(key: string): Promise<boolean> {
        const result = await this.redis.exists(key);

        return new Promise(resolve => resolve(result === 1));
    }

    public async get(key: string): Promise<any | null> {
        const result = await this.redis.get(key);

        return new Promise(resolve => resolve(JSON.parse(result)));
    }

    public put(key: string, value: any, ttlSeconds: number): void {
        this.redis.set(key, JSON.stringify(value), 'EX', ttlSeconds);
    }

    public purge() {
        //
    }

    public clear() {
        //
    }
}
