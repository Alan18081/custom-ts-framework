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
const users_service_1 = require("./users.service");
const decorators_1 = require("../../lib/broker/decorators");
const communication_codes_1 = require("../../../../Common/communication-codes");
const inversify_1 = require("inversify");
const create_user_dto_1 = require("./dto/create-user.dto");
const broker_exception_1 = require("../../../../Common/broker-exception");
const communication_errors_1 = require("../../../../Common/communication-errors");
let UsersController = class UsersController {
    createOne(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersService.findOneByEmail(payload.email);
            if (user) {
                throw new broker_exception_1.BrokerException(communication_errors_1.CommunicationErrors.USER_ALREADY_EXISTS);
            }
            return yield this.usersService.createOne(payload);
        });
    }
    updateOne() {
        return __awaiter(this, void 0, void 0, function* () {
            return null;
        });
    }
};
__decorate([
    inversify_1.inject(users_service_1.UsersService),
    __metadata("design:type", users_service_1.UsersService)
], UsersController.prototype, "usersService", void 0);
__decorate([
    decorators_1.SubscribeMessage(communication_codes_1.CommunicationCodes.CREATE_USER),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createOne", null);
UsersController = __decorate([
    inversify_1.injectable()
], UsersController);
exports.UsersController = UsersController;
