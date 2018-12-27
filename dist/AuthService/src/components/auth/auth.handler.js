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
const common_1 = require("@astra/common");
const login_dto_1 = require("./dto/login.dto");
const auth_service_1 = require("./auth.service");
const message_broker_1 = require("../../helpers/message-broker");
let AuthHandler = class AuthHandler {
    login(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.validatorService.validate(payload, login_dto_1.LoginDto);
            const receivedMessage = yield message_broker_1.messageBroker.sendMessageAndGetResponse(common_1.QueuesEnum.USERS_SERVICE, common_1.CommunicationCodes.GET_USER_BY_ID, { email: payload.email });
            if (!receivedMessage.payload) {
                throw new common_1.NotFound({ error: common_1.Messages.USER_NOT_FOUND });
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
    inversify_1.inject(common_1.ValidatorService),
    __metadata("design:type", common_1.ValidatorService)
], AuthHandler.prototype, "validatorService", void 0);
__decorate([
    common_1.SubscribeMessage(common_1.CommunicationCodes.LOGIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthHandler.prototype, "login", null);
AuthHandler = __decorate([
    inversify_1.injectable()
], AuthHandler);
exports.AuthHandler = AuthHandler;
