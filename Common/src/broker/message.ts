import { CommunicationCodes } from '../enums';

export class Message {
    constructor(
        public readonly code: CommunicationCodes,
        public readonly payload: any,
        public readonly error?: boolean,
    ) {}
}