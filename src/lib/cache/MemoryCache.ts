import { Cache } from './Cache';

export interface CacheItem {
    ts: number;
    expires: number;
    value: any;
}

export interface CacheMap {
    [key: string]: CacheItem;
}

export class MemoryCache extends Cache {
    public map: CacheMap = {};

    constructor(keyPrefix = '') {
        super();

        if (keyPrefix.length) {
            keyPrefix += ':';
        }

        this.prefix = keyPrefix;
    }

    protected makeKey(key: string): string {
        return `${this.prefix}${key}`;
    }

    public async has(key: string): Promise<boolean> {
        this.purge();

        return new Promise(resolve => resolve(typeof this.map[this.makeKey(key)] !== 'undefined'));
    }

    public async get(key: string): Promise<any | null> {
        this.purge();

        const result = this.map[this.makeKey(key)]?.value ?? null;

        return new Promise(resolve => resolve(result));
    }

    public put(key: string, value: any, ttlSeconds: number) {
        this.map[this.makeKey(key)] = {
            ts: new Date().getTime(),
            expires: new Date().getTime() + ttlSeconds * 1000,
            value: value,
        };
    }

    public purge() {
        for (const prop in this.map) {
            if (new Date().getTime() >= this.map[prop].expires) {
                delete this.map[prop];
                continue;
            }
        }
    }

    public clear() {
        //
    }
}
