"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var app_module_1 = require("./app.module");
var server_1 = require("./lib/server/server");
var appModule = new app_module_1.AppModule();
var server = new server_1.Server(5000);
server.run();
