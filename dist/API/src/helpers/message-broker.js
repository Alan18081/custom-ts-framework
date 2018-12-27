"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@astra/common");
exports.messageBroker = new common_1.MessageBroker(common_1.QueuesEnum.API, common_1.QueuesEnum.RPC_API_SERVICE);
