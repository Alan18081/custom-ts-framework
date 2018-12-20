"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const app_module_1 = require("./app.module");
exports.globalContainer = new inversify_1.Container();
exports.globalContainer.bind(app_module_1.AppModule).to(app_module_1.AppModule);
// globalContainer.bind(MessageBroker).to(MessageBroker);
