import { interfaces } from 'inversify';
import Abstract = interfaces.Abstract;
export declare class Provider {
    static create<T>(moduleType: Abstract<T>): T;
}
