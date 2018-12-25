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
const common_1 = require("@astra/common");
const uid = require("uid");
class MessageBroker {
    constructor() {
        this.queue = common_1.QueuesEnum.API;
    }
    bufferMessage(message) {
        console.log('Message to buffer', message);
        return Buffer.from(JSON.stringify(message));
    }
    parseMessage(buffer) {
        return JSON.parse(buffer.toString());
    }
    handleError(err) {
        console.log('[AMQP] Connection error: ', err);
    }
    handleClose(err) {
        console.log('[AMQP] Connection closed: ', err);
    }
    sendMessage(queue, message, config = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.channel.assertQueue(queue);
            this.channel.sendToQueue(queue, this.bufferMessage(message), config);
        });
    }
    sendMessageAndGetResponse(queue, message) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.channel.assertQueue(queue);
            const id = uid();
            yield this.sendMessage(queue, message, { correlationId: id, replyTo: common_1.QueuesEnum.RPC_API, contentType: 'application/json' });
            return yield this.subscribe(id);
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
    subscribe(id) {
        return new Promise((resolve) => {
            common_1.eventEmitter.once(id, message => {
                resolve(message);
            });
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const subscribers = Reflect.getMetadata(common_1.METADATA_KEY.subscribers, Reflect) || {};
            yield this.channel.assertQueue(this.queue);
            yield this.channel.assertQueue(common_1.QueuesEnum.RPC_API);
            this.channel.consume(common_1.QueuesEnum.RPC_API, msg => {
                if (msg) {
                    try {
                        common_1.eventEmitter.emit(msg.properties.correlationId, this.parseMessage(msg.content));
                    }
                    catch (e) {
                    }
                }
            });
            this.channel.consume(this.queue, (msg) => {
                if (msg) {
                    try {
                        const message = JSON.parse(msg.content.toString());
                        const { code } = message;
                        const subscriber = subscribers[code];
                        console.log('[AMQP] New message', message);
                        if (subscriber) {
                            const result = subscriber.handler.call(subscriber.instance, message.payload, subscriber.withResponse ? this.sendMessage : null);
                            if (result instanceof Promise) {
                                result
                                    .then(res => this.sendMessage(msg.properties.replyTo, res, { correlationId: msg.properties.correlationId }))
                                    .catch(err => this.sendMessage(msg.properties.replyTo, err, { correlationId: msg.properties.correlationId }));
                            }
                            else {
                                this.sendMessage(msg.properties.replyTo, result, { correlationId: msg.properties.correlationId });
                            }
                        }
                    }
                    catch (e) {
                        console.log('[AMQP] Failed to parse message', e);
                    }
                    this.channel.ack(msg);
                }
            });
        });
    }
}
;
exports.messageBroker = new MessageBroker();
