import { Message } from './message';

export class ErrorMessage extends Message {
    public isError = true;
    public statusCode: number;
}