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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@astra/common");
const users_service_1 = require("./users.service");
const inversify_1 = require("inversify");
const find_users_list_dto_1 = require("./dto/find-users-list.dto");
const create_user_dto_1 = require("./dto/create-user.dto");
const find_user_dto_1 = require("./dto/find-user.dto");
const find_user_by_email_dto_1 = require("./dto/find-user-by-email.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const remove_user_dto_1 = require("./dto/remove-user.dto");
let UsersHandler = class UsersHandler {
    findMany(query) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.validatorService.validate(query, find_users_list_dto_1.FindUsersListDto);
            return yield this.usersService.findMany(query);
        });
    }
    findOne(query) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.validatorService.validate(query, find_user_dto_1.FindUserDto);
            return yield this.usersService.findOneById(query.id);
        });
    }
    findOneByEmail(query) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.validatorService.validate(query, find_user_by_email_dto_1.FindUserByEmailDto);
            return yield this.usersService.findOneByEmail(query.email);
        });
    }
    createOne(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.validatorService.validate(payload, create_user_dto_1.CreateUserDto);
            const user = yield this.usersService.findOneByEmail(payload.email);
            if (user) {
                throw new common_1.BadRequest({ error: common_1.Messages.USER_ALREADY_EXISTS });
            }
            return yield this.usersService.createOne(payload);
        });
    }
    updateOne(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.validatorService.validate(payload, update_user_dto_1.UpdateUserDto);
            const { id } = payload, data = __rest(payload, ["id"]);
            return yield this.usersService.updateOne(id, data);
        });
    }
    removeOne(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.validatorService.validate(payload, remove_user_dto_1.RemoveUserDto);
            yield this.usersService.removeOne(payload.id);
        });
    }
};
__decorate([
    inversify_1.inject(users_service_1.UsersService),
    __metadata("design:type", users_service_1.UsersService)
], UsersHandler.prototype, "usersService", void 0);
__decorate([
    inversify_1.inject(common_1.ValidatorService),
    __metadata("design:type", common_1.ValidatorService)
], UsersHandler.prototype, "validatorService", void 0);
__decorate([
    common_1.SubscribeMessage(common_1.CommunicationCodes.GET_USERS_LIST),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_users_list_dto_1.FindUsersListDto]),
    __metadata("design:returntype", Promise)
], UsersHandler.prototype, "findMany", null);
__decorate([
    common_1.SubscribeMessage(common_1.CommunicationCodes.GET_USER),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_user_dto_1.FindUserDto]),
    __metadata("design:returntype", Promise)
], UsersHandler.prototype, "findOne", null);
__decorate([
    common_1.SubscribeMessage(common_1.CommunicationCodes.GET_USER_BY_EMAIL),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_user_by_email_dto_1.FindUserByEmailDto]),
    __metadata("design:returntype", Promise)
], UsersHandler.prototype, "findOneByEmail", null);
__decorate([
    common_1.SubscribeMessage(common_1.CommunicationCodes.CREATE_USER),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersHandler.prototype, "createOne", null);
__decorate([
    common_1.SubscribeMessage(common_1.CommunicationCodes.UPDATE_USER),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersHandler.prototype, "updateOne", null);
__decorate([
    common_1.SubscribeMessage(common_1.CommunicationCodes.REMOVE_USER),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [remove_user_dto_1.RemoveUserDto]),
    __metadata("design:returntype", Promise)
], UsersHandler.prototype, "removeOne", null);
UsersHandler = __decorate([
    inversify_1.injectable()
], UsersHandler);
exports.UsersHandler = UsersHandler;
