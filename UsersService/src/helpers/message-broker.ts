import { MessageBroker, QueuesEnum } from '@astra/common';

export const messageBroker = new MessageBroker(QueuesEnum.USERS_SERVICE, QueuesEnum.RPC_USERS_SERVICE);