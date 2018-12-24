"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
class HttpError {
    constructor(statusCode, error) {
        this.statusCode = statusCode;
        this.error = error;
    }
}
class Unathorized extends HttpError {
    constructor(error) {
        super(http_status_codes_1.UNAUTHORIZED, error);
    }
}
exports.Unathorized = Unathorized;
