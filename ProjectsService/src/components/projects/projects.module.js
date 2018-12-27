"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@astra/common");
const inversify_1 = require("inversify");
const projects_service_1 = require("./projects.service");
const projects_handler_1 = require("./projects.handler");
const core_module_1 = require("../core/core.module");
let ProjectsModule = class ProjectsModule {
};
ProjectsModule = __decorate([
    common_1.Module({
        imports: [core_module_1.CoreModule],
        services: [projects_service_1.ProjectsService],
        handlers: [projects_handler_1.ProjectsHandler]
    }),
    inversify_1.injectable()
], ProjectsModule);
exports.ProjectsModule = ProjectsModule;
