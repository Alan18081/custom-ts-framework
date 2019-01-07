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
const class_validator_1 = require("class-validator");
const uid = require("uid");
const common_1 = require("../common");
const message_1 = require("./message");
const keys_1 = require("../metadata/keys");
const server_1 = require("../server");
class MessageBroker {
    constructor(queue, rpcQueue) {
        this.queue = queue;
        this.rpcQueue = rpcQueue;
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
    sendMessage(queue, code, payload, config = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.channel.assertQueue(queue);
            const message = new message_1.Message(code, payload);
            console.log(`[Sending Message] ${queue} : ${code}`, payload);
            this.channel.sendToQueue(queue, this.bufferMessage(message), config);
        });
    }
    sendErrorMessage(queue, code, payload, config = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.channel.assertQueue(queue);
            const message = new message_1.Message(code, payload, true);
            console.log(`[Sending Error Message] ${queue} : ${code}`, payload);
            this.channel.sendToQueue(queue, this.bufferMessage(message), config);
        });
    }
    sendMessageAndGetResponse(queue, code, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.channel.assertQueue(queue);
            const id = uid();
            yield this.sendMessage(queue, code, payload, { correlationId: id, replyTo: this.rpcQueue, contentType: 'application/json' });
            const message = yield this.subscribe(id);
            if (message.error) {
                throw message.payload;
            }
            return message;
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
        return new Promise((resolve, reject) => {
            common_1.eventEmitter.once(id, (message) => {
                resolve(message);
            });
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const subscribers = Reflect.getMetadata(keys_1.METADATA_KEY.resolvedSubscribers, Reflect) || {};
            yield this.channel.assertQueue(this.queue);
            yield this.channel.assertQueue(this.rpcQueue);
            this.channel.consume(this.rpcQueue, msg => {
                if (msg) {
                    this.channel.ack(msg);
                    common_1.eventEmitter.emit(msg.properties.correlationId, this.parseMessage(msg.content));
                }
            });
            this.channel.consume(this.queue, (msg) => __awaiter(this, void 0, void 0, function* () {
                if (msg) {
                    try {
                        this.channel.ack(msg);
                        const message = JSON.parse(msg.content.toString());
                        const { code } = message;
                        const subscriber = subscribers[code];
                        if (subscriber) {
                            if (subscriber.Validator) {
                                try {
                                    yield this.validate(message.payload, subscriber.Validator);
                                }
                                catch (e) {
                                    console.log('Validation error', e);
                                    yield this.sendErrorMessage(msg.properties.replyTo, message.code, e, { correlationId: msg.properties.correlationId });
                                    return false;
                                }
                            }
                            if (subscriber.cacheInterceptor) {
                                const data = yield subscriber.cacheInterceptor.get(JSON.stringify(message.payload));
                                if (data) {
                                    return yield this.sendMessage(msg.properties.replyTo, message.code, data, { correlationId: msg.properties.correlationId });
                                }
                            }
                            const result = subscriber.handler.call(subscriber.instance, message.payload, subscriber.withResponse ? this.sendMessage : null);
                            if (result instanceof Promise) {
                                try {
                                    const res = yield result;
                                    yield Promise.all([
                                        this.sendMessage(msg.properties.replyTo, message.code, res, { correlationId: msg.properties.correlationId }),
                                        subscriber.cacheInterceptor ? subscriber.cacheInterceptor.save(JSON.stringify(message.payload), res) : null
                                    ]);
                                }
                                catch (e) {
                                    yield this.sendErrorMessage(msg.properties.replyTo, message.code, e, { correlationId: msg.properties.correlationId });
                                }
                            }
                            else {
                                yield this.sendMessage(msg.properties.replyTo, message.code, message.payload, { correlationId: msg.properties.correlationId });
                            }
                        }
                    }
                    catch (e) {
                        console.log('[AMQP] Failed to process message', e);
                    }
                }
            }));
        });
    }
    validate(body = {}, DtoType) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = new DtoType(body);
            const errors = yield class_validator_1.validate(data);
            if (errors.length) {
                const errorMessages = errors.map(({ property, constraints }) => ({
                    property,
                    constraints: Object.keys(constraints).map(key => constraints[key])
                }));
                throw new server_1.BadRequest({ errors: errorMessages });
            }
        });
    }
}
exports.MessageBroker = MessageBroker;
;
