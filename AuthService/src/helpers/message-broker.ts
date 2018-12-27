import { MessageBroker, QueuesEnum } from '@astra/common';

export const messageBroker = new MessageBroker(QueuesEnum.AUTH_SERVICE, QueuesEnum.RPC_AUTH_SERVICE);