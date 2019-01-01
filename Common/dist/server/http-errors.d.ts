interface ErrorMessage {
    error: any;
}
interface ErrorMessagesList {
    errors: any[];
}
declare type Errors = ErrorMessage | ErrorMessagesList;
export interface HttpError {
    message: Errors;
    statusCode: number;
}
export declare class NotFound implements HttpError {
    readonly message: Errors;
    readonly statusCode: number;
    constructor(message: Errors);
}
export declare class BadRequest implements HttpError {
    readonly message: Errors;
    readonly statusCode: number;
    constructor(message: Errors);
}
export declare class ServerError implements HttpError {
    readonly message: Errors;
    readonly statusCode: number;
    constructor(message: Errors);
}
export declare class Unauthorized implements HttpError {
    readonly message: Errors;
    readonly statusCode: number;
    constructor(message: Errors);
}
export declare class Forbidden implements HttpError {
    readonly message: Errors;
    readonly statusCode: number;
    constructor(message: Errors);
}
export {};
