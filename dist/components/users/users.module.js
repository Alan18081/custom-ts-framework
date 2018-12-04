"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var module_1 = require("../../module");
var users_service_1 = require("./users.service");
var users_controller_1 = require("./users.controller");
var auth_module_1 = require("../auth/auth.module");
var db_module_1 = require("../../lib/modules/db.module");
var UsersModule = /** @class */ (function () {
    function UsersModule() {
    }
    UsersModule = __decorate([
        module_1.Module({
            imports: [auth_module_1.AuthModule, db_module_1.DbModule],
            controllers: [users_controller_1.UsersController],
            services: [users_service_1.UsersService],
            exports: []
        })
    ], UsersModule);
    return UsersModule;
}());
exports.UsersModule = UsersModule;
