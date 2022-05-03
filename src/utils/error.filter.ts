import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const errorResponse = exception.getResponse() as {
        message: string[] | string;
      };
      return response.status(status).json({
        statusCode: status,
        message: Array.isArray(errorResponse.message)
          ? errorResponse.message[0]
          : errorResponse.message,
        timestamp: new Date().toISOString(),
      });
    }

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
      timestamp: new Date().toISOString(),
    });
  }
}
