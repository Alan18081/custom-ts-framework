export interface Subscriber {
    handler: Function;
    code: string;
    withResponse: boolean;
}
export interface ResolvedSubscriber extends Subscriber {
    instance: any;
}
