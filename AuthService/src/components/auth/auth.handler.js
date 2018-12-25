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
const decorators_1 = require("../../lib/broker/decorators");
const src_1 = require("../../../../Common/src");
const http_errors_1 = require("../../helpers/http-errors");
const login_dto_1 = require("./dto/login.dto");
const auth_service_1 = require("./auth.service");
const auth_filter_1 = require("./auth.filter");
const message_broker_1 = require("../../lib/broker/message-broker");
let AuthHandler = class AuthHandler {
    login(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.authFilter.login(payload);
            const message = new src_1.Message(src_1.CommunicationCodes.GET_USER_BY_ID, { email: payload.email });
            const receivedMessage = yield message_broker_1.messageBroker.sendMessageAndGetResponse(src_1.QueuesEnum.USERS_SERVICE, message);
            if (!receivedMessage.payload) {
                throw new http_errors_1.NotFound({ error: src_1.Messages.USER_NOT_FOUND });
            }
            return yield this.authService.login(payload, receivedMessage.payload);
        });
    }
};
__decorate([
    inversify_1.inject(auth_service_1.AuthService),
    __metadata("design:type", auth_service_1.AuthService)
], AuthHandler.prototype, "authService", void 0);
__decorate([
    inversify_1.inject(auth_filter_1.AuthFilter),
    __metadata("design:type", auth_filter_1.AuthFilter)
], AuthHandler.prototype, "authFilter", void 0);
__decorate([
    decorators_1.SubscribeMessage(src_1.CommunicationCodes.LOGIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthHandler.prototype, "login", null);
AuthHandler = __decorate([
    inversify_1.injectable()
], AuthHandler);
exports.AuthHandler = AuthHandler;
