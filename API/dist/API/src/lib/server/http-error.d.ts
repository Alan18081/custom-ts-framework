export interface HttpError {
    message: any;
    statusCode: number;
}
export declare class NotFound implements HttpError {
    readonly message: any;
    readonly statusCode: number;
    constructor(message: string);
}
export declare class BadRequest implements HttpError {
    readonly message: any;
    readonly statusCode: number;
    constructor(message: any);
}
export declare class ServerError implements HttpError {
    readonly message: any;
    readonly statusCode: number;
    constructor(message: string);
}
export declare class Unauthorized implements HttpError {
    readonly message: any;
    readonly statusCode: number;
    constructor(message: string);
}
