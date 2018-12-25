"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const message_1 = require("./message");
class ErrorMessage extends message_1.Message {
    constructor() {
        super(...arguments);
        this.isError = true;
    }
}
exports.ErrorMessage = ErrorMessage;
