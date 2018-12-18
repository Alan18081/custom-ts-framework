"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const app_module_1 = require("./app.module");
const server_1 = require("./common/server/server");
const appModule = new app_module_1.AppModule();
const server = new server_1.Server(5000);
server.run();
