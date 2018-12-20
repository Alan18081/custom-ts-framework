"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server/server");
const inversify_config_1 = require("./inversify.config");
const app_module_1 = require("./app.module");
class API {
    constructor(port) {
        this.appModule = inversify_config_1.globalContainer.get(app_module_1.AppModule);
        this.server = new server_1.Server(port);
        this.server.run();
    }
}
new API(5000);
