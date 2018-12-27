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
const validator_service_1 = require("../core/services/validator.service");
const common_1 = require("@astra/common");
const create_storage_dto_1 = require("./dto/create-storage.dto");
const storages_service_1 = require("./storages.service");
const remove_storage_dto_1 = require("./dto/remove-storage.dto");
const find_storage_list_dto_1 = require("./dto/find-storage-list.dto");
const find_storage_dto_1 = require("./dto/find-storage.dto");
let StoragesHandler = class StoragesHandler {
    findManyByProject(query) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.validatorService.validate(query, find_storage_list_dto_1.FindStorageListDto);
            return yield this.storagesService.findManyByProject(query.projectId);
        });
    }
    findOneById(query) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.validatorService.validate(query, find_storage_dto_1.FindStorageDto);
            return yield this.storagesService.findOneById(query.id);
        });
    }
    createOne(body) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.validatorService.validate(body, create_storage_dto_1.CreateStorageDto);
            return yield this.storagesService.createOne(body);
        });
    }
    removeOne(body) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.validatorService.validate(body, remove_storage_dto_1.RemoveStorageDto);
            yield this.storagesService.removeOne(body.id);
        });
    }
};
__decorate([
    inversify_1.inject(validator_service_1.ValidatorService),
    __metadata("design:type", validator_service_1.ValidatorService)
], StoragesHandler.prototype, "validatorService", void 0);
__decorate([
    inversify_1.inject(storages_service_1.StoragesService),
    __metadata("design:type", storages_service_1.StoragesService)
], StoragesHandler.prototype, "storagesService", void 0);
__decorate([
    common_1.SubscribeMessage(common_1.CommunicationCodes.GET_STORAGES_LIST),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_storage_list_dto_1.FindStorageListDto]),
    __metadata("design:returntype", Promise)
], StoragesHandler.prototype, "findManyByProject", null);
__decorate([
    common_1.SubscribeMessage(common_1.CommunicationCodes.GET_STORAGE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_storage_dto_1.FindStorageDto]),
    __metadata("design:returntype", Promise)
], StoragesHandler.prototype, "findOneById", null);
__decorate([
    common_1.SubscribeMessage(common_1.CommunicationCodes.CREATE_STORAGE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_storage_dto_1.CreateStorageDto]),
    __metadata("design:returntype", Promise)
], StoragesHandler.prototype, "createOne", null);
__decorate([
    common_1.SubscribeMessage(common_1.CommunicationCodes.REMOVE_STORAGE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [remove_storage_dto_1.RemoveStorageDto]),
    __metadata("design:returntype", Promise)
], StoragesHandler.prototype, "removeOne", null);
StoragesHandler = __decorate([
    inversify_1.injectable()
], StoragesHandler);
exports.StoragesHandler = StoragesHandler;
