export abstract class HttpException extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode || 500;
  }
}

export class BadRequestException extends HttpException {
  constructor(message?: string) {
    super(message || 'Bad Request', 400);
    this.name = 'Bad Request';
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message?: string) {
    super(message || 'Unauthorized', 401);
    this.name = 'Unauthorized';
  }
}

export class ForbiddenException extends HttpException {
  constructor(message?: string) {
    super(message || 'Forbidden', 403);
    this.name = 'Forbidden';
  }
}

export class NotFoundException extends HttpException {
  constructor(message?: string) {
    super(message || 'Not Found', 404);
    this.name = 'Not Found';
  }
}
