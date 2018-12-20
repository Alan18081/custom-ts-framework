"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const module_inversify_1 = require("./modules/module.inversify");
const users_module_1 = require("./components/users/users.module");
const inversify_1 = require("inversify");
const broker_module_1 = require("./components/broker/broker.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    module_inversify_1.Module({
        imports: [
            broker_module_1.BrokerModule,
            users_module_1.UsersModule,
        ],
        controllers: [],
        exports: [],
    }),
    inversify_1.injectable()
], AppModule);
exports.AppModule = AppModule;
