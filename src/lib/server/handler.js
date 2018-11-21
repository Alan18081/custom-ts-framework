"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Handler = /** @class */ (function () {
    function Handler(url, handler) {
        this.params = [];
        this.url = url;
        this.handler = handler;
        this.urlReg = new RegExp(url.replace(/:.\//, ':.\/'));
    }
    Handler.prototype.parseParams = function (url) {
        var _this = this;
        var repl = url.replace(this.urlReg, function (match) {
            _this.params.push(match);
            return match;
        });
    };
    Handler.prototype.getHandler = function () {
        return this.handler;
    };
    Handler.prototype.isValid = function (url) {
        return this.urlReg.test(url);
    };
    return Handler;
}());
exports.Handler = Handler;
