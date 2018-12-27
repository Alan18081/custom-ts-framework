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
require("reflect-metadata");
const amqplib_1 = require("amqplib");
const message_broker_1 = require("./helpers/message-broker");
const common_1 = require("@astra/common");
const app_module_1 = require("./app.module");
class AuthService {
    constructor() {
        this.appModule = new app_module_1.AppModule();
        this.initBroker();
    }
    initBroker() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield amqplib_1.connect(common_1.config.rabbitmq.url);
                yield message_broker_1.messageBroker.run(connection);
                console.log('AuthService is working');
            }
            catch (e) {
                console.log('[AMQP] Failed to create connection: ', e.message);
            }
        });
    }
}
new AuthService();
