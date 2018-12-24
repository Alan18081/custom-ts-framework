"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NotFound = /** @class */ (function () {
    function NotFound(message) {
        this.message = message;
        this.statusCode = 404;
    }
    return NotFound;
}());
exports.NotFound = NotFound;
var BadRequest = /** @class */ (function () {
    function BadRequest(message) {
        this.message = message;
        this.statusCode = 400;
    }
    return BadRequest;
}());
exports.BadRequest = BadRequest;
var ServerError = /** @class */ (function () {
    function ServerError(message) {
        this.message = message;
        this.statusCode = 500;
    }
    return ServerError;
}());
exports.ServerError = ServerError;
var Unathorized = /** @class */ (function () {
    function Unathorized(message) {
        this.message = message;
        this.statusCode = 401;
    }
    return Unathorized;
}());
exports.Unathorized = Unathorized;
