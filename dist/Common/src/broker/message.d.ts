import { CommunicationCodes } from '../enums';
export declare class Message {
    readonly code: CommunicationCodes;
    readonly payload: any;
    constructor(code: CommunicationCodes, payload: any);
}
