import { UNAUTHORIZED } from 'http-status-codes';

abstract class HttpError {
    protected constructor(
        public readonly statusCode: number,
        public error: any
    ) {}
}

export class Unathorized extends HttpError {
    constructor(error: any) {
        super(UNAUTHORIZED, error);
    }
}