/* eslint-disable no-unused-vars */

export abstract class Cache {
    public prefix = '';

    public destroy() {
        //
    }
    public abstract has(key: string): Promise<boolean>;

    public abstract get(key: string): Promise<any | null>;

    public abstract put(key: string, value: any, ttlSeconds: number): void;

    public abstract purge();

    public abstract clear(): boolean;
}
