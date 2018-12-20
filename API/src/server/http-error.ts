interface HttpError {
  message: string;
  statusCode: number;
}

export class NotFound implements HttpError {
  public readonly message: string;
  public readonly statusCode: number;
  constructor(message: string) {
    this.message = message;
    this.statusCode = 404;
  }
}

export class BadRequest implements HttpError {
  public readonly message: string;
  public readonly statusCode: number;
  constructor(message: string) {
    this.message = message;
    this.statusCode = 400;
  }
}

export class ServerError implements HttpError {
  public readonly message: string;
  public readonly statusCode: number;
  constructor(message: string) {
    this.message = message;
    this.statusCode = 500;
  }
}

export class Unathorized implements HttpError {
  public readonly message: string;
  public readonly statusCode: number;
  constructor(message: string) {
    this.message = message;
    this.statusCode = 401;
  }
}