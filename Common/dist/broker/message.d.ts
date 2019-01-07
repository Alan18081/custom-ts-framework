import { CommunicationCodes } from '../enums';
export declare class Message {
    readonly code: CommunicationCodes;
    readonly payload: any;
    readonly error?: boolean;
    constructor(code: CommunicationCodes, payload: any, error?: boolean);
}
