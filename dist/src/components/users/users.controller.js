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
const route_decorators_1 = require("../../common/server/route-decorators");
const users_service_1 = require("./users.service");
const route_params_decorators_1 = require("../../common/server/route-params.decorators");
const guards_decorators_1 = require("../../common/server/guards-decorators");
const auth_guard_1 = require("../auth/auth.guard");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    getUsers(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Hello');
            return [];
            // return await this.usersService.findAll();
        });
    }
    createOne(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.usersService.createOne(body);
        });
    }
    updateOne(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            // return await this.usersService.updateOne(id, body);
            return null;
        });
    }
};
__decorate([
    route_decorators_1.Get(''),
    guards_decorators_1.UseGuards(auth_guard_1.AuthGuard),
    __param(0, route_params_decorators_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUsers", null);
__decorate([
    route_decorators_1.Post(''),
    __param(0, route_params_decorators_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createOne", null);
__decorate([
    route_decorators_1.Put(':id'),
    __param(0, route_params_decorators_1.Param('id')), __param(1, route_params_decorators_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateOne", null);
UsersController = __decorate([
    route_decorators_1.Controller('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
