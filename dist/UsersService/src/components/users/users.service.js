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
const user_model_1 = require("./user.model");
const inversify_1 = require("inversify");
const passwords_service_1 = require("../core/services/passwords.service");
let UsersService = class UsersService {
    findMany(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.UserModel.find(query);
        });
    }
    findOneById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.UserModel.findOne({ id });
        });
    }
    findOneByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.UserModel.findOne({ email });
        });
    }
    createOne(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = new user_model_1.UserModel(userData);
            newUser.password = yield this.passwordsService.encryptPassword(userData.password);
            return yield user_model_1.UserModel.save(newUser);
        });
    }
    updateOne(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.UserModel.update({ id }, Object.assign({}, data));
        });
    }
    removeOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield user_model_1.UserModel.delete({ id });
        });
    }
};
__decorate([
    inversify_1.inject(passwords_service_1.PasswordsService),
    __metadata("design:type", passwords_service_1.PasswordsService)
], UsersService.prototype, "passwordsService", void 0);
UsersService = __decorate([
    inversify_1.injectable()
], UsersService);
exports.UsersService = UsersService;
