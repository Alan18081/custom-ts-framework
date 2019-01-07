import 'reflect-metadata';
import { BaseDto } from '../dto';
interface SubscriberConfig {
    response: boolean;
}
export declare function SubscribeMessage(code: string, config?: SubscriberConfig): (target: any, name: string, descriptor: PropertyDescriptor) => void;
export declare function Validate<T extends BaseDto>(Validator: T): (target: any, name: string, descriptor: PropertyDescriptor) => void;
export {};
