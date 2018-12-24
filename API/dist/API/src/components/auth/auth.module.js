"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const module_inversify_1 = require("../../lib/modules/module.inversify");
const auth_controller_1 = require("./auth.controller");
const jwt_guard_1 = require("../../helpers/guards/jwt.guard");
const auth_service_1 = require("./auth.service");
const inversify_1 = require("inversify");
const broker_module_1 = require("../broker/broker.module");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    module_inversify_1.Module({
        imports: [broker_module_1.BrokerModule],
        controllers: [auth_controller_1.AuthController],
        services: [jwt_guard_1.JwtGuard, auth_service_1.AuthService]
    }),
    inversify_1.injectable()
], AuthModule);
exports.AuthModule = AuthModule;
