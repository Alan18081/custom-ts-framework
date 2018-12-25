"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const module_inversify_1 = require("../../lib/modules/module.inversify");
const auth_handler_1 = require("./auth.handler");
const core_module_1 = require("../core/core.module");
const auth_service_1 = require("./auth.service");
const auth_filter_1 = require("./auth.filter");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    module_inversify_1.Module({
        imports: [core_module_1.CoreModule],
        services: [auth_service_1.AuthService, auth_filter_1.AuthFilter],
        handlers: [auth_handler_1.AuthHandler]
    })
], AuthModule);
exports.AuthModule = AuthModule;
