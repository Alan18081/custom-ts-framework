"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const message_broker_1 = require("../../broker/message-broker");
const module_inversify_1 = require("../../modules/module.inversify");
let BrokerModule = class BrokerModule {
    constructor() {
        console.log('Broker module created');
    }
};
BrokerModule = __decorate([
    module_inversify_1.Module({
        imports: [],
        services: [message_broker_1.MessageBroker]
    }),
    __metadata("design:paramtypes", [])
], BrokerModule);
exports.BrokerModule = BrokerModule;
