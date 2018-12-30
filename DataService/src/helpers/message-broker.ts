import { MessageBroker, QueuesEnum } from '@astra/common';

export const messageBroker = new MessageBroker(QueuesEnum.DATA_SERVICE, QueuesEnum.RPC_DATA_SERVICE);