import { CommunicationCodes } from '../common';

export class Message {
    constructor(
        public readonly code: CommunicationCodes,
        public readonly payload: any,
    ) {}
}