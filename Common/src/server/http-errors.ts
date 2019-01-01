interface ErrorMessage {
    error: any;
}

interface ErrorMessagesList {
    errors: any[];
}

type Errors = ErrorMessage | ErrorMessagesList;

export interface HttpError {
  message: Errors;
  statusCode: number;
}

export class NotFound implements HttpError {
  public readonly message: Errors;
  public readonly statusCode: number;

  constructor(message: Errors) {
    this.message = message;
    this.statusCode = 404;
  }
}

export class BadRequest implements HttpError {
  public readonly message: Errors;
  public readonly statusCode: number;

  constructor(message: Errors) {
    this.message = message;
    this.statusCode = 400;
  }
}

export class ServerError implements HttpError {
  public readonly message: Errors;
  public readonly statusCode: number;

  constructor(message: Errors) {
    this.message = message;
    this.statusCode = 500;
  }
}

export class Unauthorized implements HttpError {
  public readonly message: Errors;
  public readonly statusCode: number;
  constructor(message: Errors) {
    this.message = message;
    this.statusCode = 401;
  }
}

export class Forbidden implements HttpError {
    public readonly message: Errors;
    public readonly statusCode: number;
    constructor(message: Errors) {
        this.message = message;
        this.statusCode = 403;
    }
}