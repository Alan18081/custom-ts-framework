"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NotFound {
    constructor(message) {
        this.message = message;
        this.statusCode = 404;
    }
}
exports.NotFound = NotFound;
class BadRequest {
    constructor(message) {
        this.message = message;
        this.statusCode = 400;
    }
}
exports.BadRequest = BadRequest;
class ServerError {
    constructor(message) {
        this.message = message;
        this.statusCode = 500;
    }
}
exports.ServerError = ServerError;
class Unathorized {
    constructor(message) {
        this.message = message;
        this.statusCode = 401;
    }
}
exports.Unathorized = Unathorized;
