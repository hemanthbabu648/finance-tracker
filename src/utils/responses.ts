import { ApiStatus, ApiStatusCode } from '@/types';

export class ApiBaseResponse {
  statusCode: ApiStatusCode;
  status: ApiStatus;
  message: string;

  constructor(statusCode: ApiStatusCode, status: ApiStatus, message: string) {
    this.statusCode = statusCode;
    this.status = status;
    this.message = message;
  }
}

export class ApiSuccessResponse extends ApiBaseResponse {
  data?: unknown;

  constructor(
    statusCode: ApiStatusCode,
    status: ApiStatus,
    message: string,
    data?: unknown,
  ) {
    super(statusCode, status, message);
    this.data = data;
  }
}

export class ApiErrorResponse extends ApiBaseResponse {
  error?: unknown;

  constructor(
    statusCode: ApiStatusCode,
    status: ApiStatus,
    message: string,
    error?: unknown,
  ) {
    super(statusCode, status, message);
    this.error = error;
  }
}
