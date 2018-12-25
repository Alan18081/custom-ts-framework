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
const queues_enum_1 = require("../../../../Common/broker/queues.enum");
const keys_1 = require("../../../../Common/metadata/keys");
exports.messageBroker = new class {
    constructor() {
        this.queue = queues_enum_1.QueuesEnum.USERS_SERVICE;
    }
    handleError(err) {
        console.log('[AMQP] Connection error: ', err);
    }
    handleClose(err) {
        console.log('[AMQP] Connection closed: ', err);
    }
    sendMessage(queue, message) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.channel.assertQueue(queue);
            message.sourceQueue = this.queue;
            this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
        });
    }
    run(connection) {
        return __awaiter(this, void 0, void 0, function* () {
            this.connection = connection;
            this.channel = yield this.connection.createChannel();
            this.connection.on('error', this.handleError.bind(this));
            this.connection.on('close', this.handleClose.bind(this));
            yield this.init();
            console.log('[AMQP] Connection established');
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const subscribers = Reflect.getMetadata(keys_1.METADATA_KEY.subscribers, Reflect) || {};
            yield this.channel.assertQueue(this.queue);
            this.channel.consume(this.queue, (msg) => __awaiter(this, void 0, void 0, function* () {
                if (msg) {
                    try {
                        const message = JSON.parse(msg.content.toString());
                        const { code } = message;
                        const subscriber = subscribers[code];
                        if (subscriber) {
                            try {
                                const result = subscriber.handler(message.payload, subscriber.withResponse ? this.sendMessage : null);
                            }
                            catch (e) {
                            }
                        }
                    }
                    catch (e) {
                        console.log('[AMQP] Failed to parse message');
                    }
                }
            }));
        });
    }
};
