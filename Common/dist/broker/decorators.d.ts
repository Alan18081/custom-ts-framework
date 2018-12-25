import 'reflect-metadata';
interface SubscriberConfig {
    response: boolean;
}
export declare function SubscribeMessage(code: string, config?: SubscriberConfig): (target: any, name: string, descriptor: PropertyDescriptor) => void;
export {};
