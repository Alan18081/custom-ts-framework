"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var injector_1 = require("../injector");
var UsersService = /** @class */ (function () {
    function UsersService() {
    }
    UsersService.prototype.findOne = function () {
        console.log('Hi from user service');
    };
    UsersService = __decorate([
        injector_1.Injectable()
    ], UsersService);
    return UsersService;
}());
exports.UsersService = UsersService;
