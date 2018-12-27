import { MessageBroker, QueuesEnum } from '@astra/common';

export const messageBroker = new MessageBroker(QueuesEnum.API, QueuesEnum.RPC_API_SERVICE);