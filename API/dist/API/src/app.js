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
const amqplib_1 = require("amqplib");
const message_broker_1 = require("../../Common/broker/message-broker");
const server_1 = require("../../Common/server/server");
class API {
    constructor(port) {
        this.server = new server_1.Server(port);
        this.initBroker();
        this.server.run();
    }
    initBroker() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield amqplib_1.connect(config_1.config.rabbitmq.url);
            this.messageBroker = new message_broker_1.MessageBroker(connection);
        });
    }
}
new API(5000);
