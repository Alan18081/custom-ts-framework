import { MessageBroker, QueuesEnum } from '@astra/common';

export const messageBroker = new MessageBroker(QueuesEnum.PROJECTS_SERVICE, QueuesEnum.RPC_PROJECTS_SERVICE);