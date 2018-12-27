"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const common_1 = require("@astra/common");
const users_module_1 = require("./components/users/users.module");
const auth_module_1 = require("./components/auth/auth.module");
const projects_module_1 = require("./components/projects/projects.module");
const storages_module_1 = require("./components/storages/storages.module");
const payments_module_1 = require("./components/payments/payments.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            projects_module_1.ProjectsModule,
            storages_module_1.StoragesModule,
            payments_module_1.PaymentsModule
        ],
    }),
    inversify_1.injectable()
], AppModule);
exports.AppModule = AppModule;
