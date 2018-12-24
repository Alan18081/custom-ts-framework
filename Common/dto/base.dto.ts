export class BaseDto {
    constructor(data: any) {
        Object.assign(this, data);
    }
}