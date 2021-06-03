export interface CacheItem {
    ts: number;
    expires: number;
    value: any;
}

export interface CacheMap {
    [key: string]: CacheItem;
}

export class MemoryCache {
    public map: CacheMap = {};

    public has(key: string): boolean {
        this.purge();

        return typeof this.map[key] !== 'undefined';
    }

    public get(key: string): any {
        this.purge();

        return this.map[key]?.value ?? null;
    }

    public put(key: string, value: any, ttlSeconds: number) {
        this.map[key] = {
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
}
