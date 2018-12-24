"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
const channel_api_1 = require("amqplib/channel_api");
const server_1 = require("./lib/server/server");
const app_module_1 = require("./app.module");
const message_broker_1 = require("./lib/broker/message-broker");
class API {
    constructor(port) {
        this.appModule = new app_module_1.AppModule();
        this.server = new server_1.Server(port);
        this.initBroker();
        this.server.run();
    }
    initBroker() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield channel_api_1.connect(config_1.config.rabbitmq.url);
                yield message_broker_1.messageBroker.run(connection);
            }
            catch (e) {
                console.log('[AMQP] Failed to create connection: ', e.message);
            }
        });
    }
}
new API(5000);
