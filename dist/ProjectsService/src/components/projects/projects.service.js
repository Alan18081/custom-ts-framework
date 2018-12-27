"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
const uid = require("uid");
const project_model_1 = require("./project.model");
let ProjectsService = class ProjectsService {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield project_model_1.ProjectModel.find({});
        });
    }
    findManyByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield project_model_1.ProjectModel.find({ userId });
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield project_model_1.ProjectModel.findOne({ id });
        });
    }
    createOne(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = new project_model_1.ProjectModel(Object.assign({}, body));
            project.clientId = uid(10);
            project.clientSecret = uid(15);
            return yield project_model_1.ProjectModel.save(project);
        });
    }
    updateOne(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield project_model_1.ProjectModel.update({ id: body }, Object.assign({}, body));
        });
    }
    removeOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield project_model_1.ProjectModel.delete({ id });
        });
    }
};
ProjectsService = __decorate([
    inversify_1.injectable()
], ProjectsService);
exports.ProjectsService = ProjectsService;
