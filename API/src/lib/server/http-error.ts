export interface HttpError {
  message: any;
  statusCode: number;
}

export class NotFound implements HttpError {
  public readonly message: any;
  public readonly statusCode: number;

  constructor(message: string) {
    this.message = message;
    this.statusCode = 404;
  }
}

export class BadRequest implements HttpError {
  public readonly message: any;
  public readonly statusCode: number;

  constructor(message: any) {
    this.message = message;
    this.statusCode = 400;
  }
}

export class ServerError implements HttpError {
  public readonly message: any;
  public readonly statusCode: number;
  constructor(message: string) {
    this.message = message;
    this.statusCode = 500;
  }
}

export class Unauthorized implements HttpError {
  public readonly message: any;
  public readonly statusCode: number;
  constructor(message: string) {
    this.message = message;
    this.statusCode = 401;
  }
}