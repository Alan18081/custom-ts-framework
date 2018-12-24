"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const auth_service_1 = require("../../components/auth/auth.service");
let JwtGuard = class JwtGuard {
    check(req, res, next) {
        return this.authService.authenticateJwt(req, res, next);
    }
};
__decorate([
    inversify_1.inject(auth_service_1.AuthService),
    __metadata("design:type", auth_service_1.AuthService)
], JwtGuard.prototype, "authService", void 0);
JwtGuard = __decorate([
    inversify_1.injectable()
], JwtGuard);
exports.JwtGuard = JwtGuard;
