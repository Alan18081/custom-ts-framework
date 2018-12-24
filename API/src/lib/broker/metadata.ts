export interface Subscriber {
    handler: Function;
    code: string;
    withResponse: boolean;
}