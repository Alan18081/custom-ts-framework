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
const route_decorators_1 = require("../../lib/server/route-decorators");
const route_params_decorators_1 = require("../../lib/server/route-params.decorators");
const inversify_1 = require("inversify");
const message_1 = require("../../../../Common/broker/message");
const message_broker_1 = require("../../lib/broker/message-broker");
const communication_codes_1 = require("../../../../Common/communication-codes");
const queues_enum_1 = require("../../../../Common/queues.enum");
const guards_decorators_1 = require("../../lib/server/guards-decorators");
const jwt_guard_1 = require("../../helpers/guards/jwt.guard");
let UsersController = class UsersController {
    findMany(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield message_broker_1.messageBroker.sendMessageAndGetResponse(queues_enum_1.QueuesEnum.USERS_SERVICE, new message_1.Message(communication_codes_1.CommunicationCodes.GET_USERS_LIST, query));
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield message_broker_1.messageBroker.sendMessageAndGetResponse(queues_enum_1.QueuesEnum.USERS_SERVICE, new message_1.Message(communication_codes_1.CommunicationCodes.GET_USER, { id }));
        });
    }
    createOne(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield message_broker_1.messageBroker.sendMessageAndGetResponse(queues_enum_1.QueuesEnum.USERS_SERVICE, new message_1.Message(communication_codes_1.CommunicationCodes.CREATE_USER, body));
        });
    }
};
__decorate([
    route_decorators_1.Get(''),
    guards_decorators_1.UseGuards(jwt_guard_1.JwtGuard),
    __param(0, route_params_decorators_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findMany", null);
__decorate([
    route_decorators_1.Get(':id'),
    __param(0, route_params_decorators_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
__decorate([
    route_decorators_1.Post(''),
    __param(0, route_params_decorators_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createOne", null);
UsersController = __decorate([
    inversify_1.injectable(),
    route_decorators_1.Controller('users')
], UsersController);
exports.UsersController = UsersController;
