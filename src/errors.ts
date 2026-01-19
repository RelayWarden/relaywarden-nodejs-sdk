/**
 * Error classes for the RelayWarden SDK.
 */

export class APIError extends Error {
  public readonly code: number;
  public readonly errorCode: string;
  public readonly requestId: string;
  public readonly details: Array<{ field: string; message: string }>;

  constructor(
    message: string,
    code: number = 0,
    errorCode: string = '',
    requestId: string = '',
    details: Array<{ field: string; message: string }> = []
  ) {
    super(message);
    this.name = 'APIError';
    this.code = code;
    this.errorCode = errorCode;
    this.requestId = requestId;
    this.details = details;
  }

  toString(): string {
    return `API error (${this.code}): ${this.message} [Request ID: ${this.requestId}]`;
  }
}

export class AuthenticationError extends APIError {
  constructor(message: string, code: number = 401, requestId: string = '') {
    super(message, code, 'unauthorized', requestId);
    this.name = 'AuthenticationError';
  }

  toString(): string {
    return `Authentication failed: ${this.message} [Request ID: ${this.requestId}]`;
  }
}

export class RateLimitError extends APIError {
  public readonly retryAfter: number;

  constructor(
    message: string,
    code: number = 429,
    requestId: string = '',
    retryAfter: number = 60
  ) {
    super(message, code, 'rate_limit_exceeded', requestId);
    this.name = 'RateLimitError';
    this.retryAfter = retryAfter;
  }

  toString(): string {
    return `Rate limit exceeded: ${this.message} [Retry after: ${this.retryAfter} seconds, Request ID: ${this.requestId}]`;
  }
}

export class ValidationError extends APIError {
  constructor(
    message: string,
    details: Array<{ field: string; message: string }> = [],
    requestId: string = '',
    code: number = 422
  ) {
    super(message, code, 'validation_error', requestId, details);
    this.name = 'ValidationError';
  }

  toString(): string {
    return `Validation failed: ${this.message} [Request ID: ${this.requestId}]`;
  }
}
