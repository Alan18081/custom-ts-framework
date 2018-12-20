"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = require("./modules/module");
const users_module_1 = require("./components/users/users.module");
const message_broker_1 = require("../../Common/broker/message-broker");
let AppModule = class AppModule {
};
AppModule = __decorate([
    module_1.Module({
        imports: [
            users_module_1.UsersModule
        ],
        controllers: [],
        services: [
            message_broker_1.MessageBroker
        ],
        exports: [],
    })
], AppModule);
exports.AppModule = AppModule;
