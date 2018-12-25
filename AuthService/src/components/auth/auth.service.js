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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const passwords_service_1 = require("../core/services/passwords.service");
const http_errors_1 = require("../../helpers/http-errors");
const src_1 = require("../../../../Common/src");
const jsonwebtoken_1 = require("jsonwebtoken");
const common_1 = require("../../config/common");
let AuthService = class AuthService {
    login(payload, user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.passwordsService.comparePassword(payload.password, user.password)) {
                throw new http_errors_1.Unauthorized({ error: src_1.Messages.WRONG_PASSWORD });
            }
            const token = jsonwebtoken_1.sign({ email: user.email, id: user.id }, common_1.JWT_SECRET);
            return {
                token,
                user
            };
        });
    }
};
__decorate([
    inversify_1.inject(passwords_service_1.PasswordsService),
    __metadata("design:type", passwords_service_1.PasswordsService)
], AuthService.prototype, "passwordsService", void 0);
AuthService = __decorate([
    inversify_1.injectable()
], AuthService);
exports.AuthService = AuthService;
