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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
const route_decorators_1 = require("../../lib/server/route-decorators");
const route_params_decorators_1 = require("../../lib/server/route-params.decorators");
const message_broker_1 = require("../../lib/broker/message-broker");
const queues_enum_1 = require("../../../../Common/queues.enum");
const message_1 = require("../../../../Common/broker/message");
const communication_codes_1 = require("../../../../Common/communication-codes");
let AuthController = class AuthController {
    login(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = new message_1.Message(communication_codes_1.CommunicationCodes.LOGIN, body);
            return yield message_broker_1.messageBroker.sendMessageAndGetResponse(queues_enum_1.QueuesEnum.AUTH_SERVICE, message);
        });
    }
};
__decorate([
    route_decorators_1.Post('login'),
    __param(0, route_params_decorators_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
AuthController = __decorate([
    route_decorators_1.Controller('auth'),
    inversify_1.injectable()
], AuthController);
exports.AuthController = AuthController;
