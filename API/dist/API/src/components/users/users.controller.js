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
const users_service_1 = require("./users.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const users_filter_1 = require("./users.filter");
let UsersController = class UsersController {
    createOne(body) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.usersFilter.createUser(body);
            yield this.usersService.createUser(body);
        });
    }
};
__decorate([
    inversify_1.inject(users_service_1.UsersService),
    __metadata("design:type", users_service_1.UsersService)
], UsersController.prototype, "usersService", void 0);
__decorate([
    inversify_1.inject(users_filter_1.UsersFilter),
    __metadata("design:type", users_filter_1.UsersFilter)
], UsersController.prototype, "usersFilter", void 0);
__decorate([
    route_decorators_1.Post(''),
    __param(0, route_params_decorators_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createOne", null);
UsersController = __decorate([
    inversify_1.injectable(),
    route_decorators_1.Controller('auth')
], UsersController);
exports.UsersController = UsersController;
