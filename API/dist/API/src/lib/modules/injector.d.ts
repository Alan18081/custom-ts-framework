import 'reflect-metadata';
export declare function Injectable(): (target: any) => void;
export declare const Injector: {
    resolve<T>(target: any, module: any, serviceTypes: any[]): T;
};
