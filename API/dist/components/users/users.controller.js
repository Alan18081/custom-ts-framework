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
const common_1 = require("@astra/common");
const inversify_1 = require("inversify");
const message_broker_1 = require("../../helpers/message-broker");
const jwt_guard_1 = require("../../helpers/guards/jwt.guard");
const roles_guards_factory_1 = require("../../helpers/roles-guards.factory");
let UsersController = class UsersController {
    findMany(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = yield message_broker_1.messageBroker.sendMessageAndGetResponse(common_1.QueuesEnum.USERS_SERVICE, common_1.CommunicationCodes.GET_USERS_LIST, query);
            return message.payload;
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = yield message_broker_1.messageBroker.sendMessageAndGetResponse(common_1.QueuesEnum.USERS_SERVICE, common_1.CommunicationCodes.GET_USER, { id });
            return message.payload;
        });
    }
    createOne(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = yield message_broker_1.messageBroker.sendMessageAndGetResponse(common_1.QueuesEnum.USERS_SERVICE, common_1.CommunicationCodes.CREATE_USER, body);
            return message.payload;
        });
    }
    updateOne(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = yield message_broker_1.messageBroker.sendMessageAndGetResponse(common_1.QueuesEnum.USERS_SERVICE, common_1.CommunicationCodes.UPDATE_USER, Object.assign({}, body, { id }));
            return message.payload;
        });
    }
    removeOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield message_broker_1.messageBroker.sendMessageAndGetResponse(common_1.QueuesEnum.USERS_SERVICE, common_1.CommunicationCodes.REMOVE_USER, { id });
        });
    }
};
__decorate([
    common_1.Get(''),
    common_1.UseGuards(jwt_guard_1.JwtGuard, roles_guards_factory_1.rolesGuardsFactory(common_1.Roles.ADMIN)),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findMany", null);
__decorate([
    common_1.Get(':id'),
    common_1.UseGuards(jwt_guard_1.JwtGuard, roles_guards_factory_1.rolesGuardsFactory(common_1.Roles.ADMIN)),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
__decorate([
    common_1.Post(''),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createOne", null);
__decorate([
    common_1.Put(':id'),
    common_1.UseGuards(jwt_guard_1.JwtGuard, roles_guards_factory_1.rolesGuardsFactory(common_1.Roles.ADMIN)),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateOne", null);
__decorate([
    common_1.Delete(':id'),
    common_1.UseGuards(jwt_guard_1.JwtGuard, roles_guards_factory_1.rolesGuardsFactory(common_1.Roles.ADMIN)),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "removeOne", null);
UsersController = __decorate([
    inversify_1.injectable(),
    common_1.Controller('users')
], UsersController);
exports.UsersController = UsersController;
