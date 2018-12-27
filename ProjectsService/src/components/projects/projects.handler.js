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
find - one.dto;
const common_1 = require("@astra/common");
const create_project_dto_1 = require("./dto/create-project.dto");
const projects_service_1 = require("./projects.service");
const validator_service_1 = require("../core/services/validator.service");
const update_project_dto_1 = require("./dto/update-project.dto");
const remove_project_dto_1 = require("./dto/remove-project.dto");
const find_projects_list_by_user_dto_1 = require("./dto/find-projects-list-by-user.dto");
const find_project_dto_1 = require("./dto/find-project.dto");
let ProjectsHandler = class ProjectsHandler {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.projectsService.findAll();
        });
    }
    findManyByUser(query) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.validatorService.validate(query, find_projects_list_by_user_dto_1.FindProjectsListByUserDto);
            return yield this.projectsService.findManyByUser(query.userId);
        });
    }
    findOne(query) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.validatorService.validate(query, find_project_dto_1.FindProjectDto);
            return yield this.projectsService.findOne(query.id);
        });
    }
    createOne(body) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.validatorService.validate(body, create_project_dto_1.CreateProjectDto);
            return yield this.projectsService.createOne(body);
        });
    }
    createOne(body) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.validatorService.validate(body, update_project_dto_1.UpdateProjectDto);
            return yield this.projectsService.updateOne(body);
        });
    }
    createOne(body) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.validatorService.validate(body, remove_project_dto_1.RemoveProjectDto);
            yield this.projectsService.removeOne(body.id);
        });
    }
};
__decorate([
    inversify_1.inject(validator_service_1.ValidatorService),
    __metadata("design:type", validator_service_1.ValidatorService)
], ProjectsHandler.prototype, "validatorService", void 0);
__decorate([
    inversify_1.inject(projects_service_1.ProjectsService),
    __metadata("design:type", projects_service_1.ProjectsService)
], ProjectsHandler.prototype, "projectsService", void 0);
__decorate([
    common_1.SubscribeMessage(common_1.CommunicationCodes.GET_PROJECTS_LIST),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProjectsHandler.prototype, "findAll", null);
__decorate([
    common_1.SubscribeMessage(common_1.CommunicationCodes.GET_PROJECTS_LIST_BY_USER),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_projects_list_by_user_dto_1.FindProjectsListByUserDto]),
    __metadata("design:returntype", Promise)
], ProjectsHandler.prototype, "findManyByUser", null);
__decorate([
    common_1.SubscribeMessage(common_1.CommunicationCodes.GET_PROJECT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_project_dto_1.FindProjectDto]),
    __metadata("design:returntype", Promise)
], ProjectsHandler.prototype, "findOne", null);
__decorate([
    common_1.SubscribeMessage(common_1.CommunicationCodes.CREATE_PROJECT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_project_dto_1.CreateProjectDto]),
    __metadata("design:returntype", Promise)
], ProjectsHandler.prototype, "createOne", null);
__decorate([
    common_1.SubscribeMessage(common_1.CommunicationCodes.UPDATE_PROJECT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_project_dto_1.UpdateProjectDto]),
    __metadata("design:returntype", Promise)
], ProjectsHandler.prototype, "createOne", null);
__decorate([
    common_1.SubscribeMessage(common_1.CommunicationCodes.REMOVE_PROJECT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [remove_project_dto_1.RemoveProjectDto]),
    __metadata("design:returntype", Promise)
], ProjectsHandler.prototype, "createOne", null);
ProjectsHandler = __decorate([
    inversify_1.injectable()
], ProjectsHandler);
exports.ProjectsHandler = ProjectsHandler;
