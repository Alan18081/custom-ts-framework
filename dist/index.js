"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var users_module_1 = require("./users/users.module");
var server_1 = require("./server/server");
var userModule = new users_module_1.UsersModule();
var server = new server_1.Server(4000);
server.run();
// console.log(Reflect.getMetadata(MODULE_KEYS.exports, AuthModule));
