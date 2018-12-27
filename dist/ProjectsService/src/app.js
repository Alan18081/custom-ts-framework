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
const message_1 = require("./helpers/message");
const config_1 = require("./config");
const app_module_1 = require("./app.module");
class UsersService {
    constructor() {
        this.appModule = new app_module_1.AppModule();
        this.initBroker();
    }
    initBroker() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield amqplib_1.connect(config_1.RABBITMQ_URL);
                yield message_1.messageBroker.run(connection);
                console.log('ProjectsService is working');
            }
            catch (e) {
                console.log('[AMQP] Failed to create connection: ', e.message);
            }
        });
    }
}
new UsersService();
