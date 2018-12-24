export class Message {
    constructor(
        public readonly code: string,
        public readonly payload: any,
    ) {}
}