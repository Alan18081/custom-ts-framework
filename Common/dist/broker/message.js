"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Message {
    constructor(code, payload, error) {
        this.code = code;
        this.payload = payload;
        this.error = error;
    }
}
exports.Message = Message;
