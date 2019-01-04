import { MessageBroker, QueuesEnum } from '@astra/common';

export const messageBroker = new MessageBroker(QueuesEnum.PAYMENTS_SERVICE, QueuesEnum.PAYMENTS_SERVICE);