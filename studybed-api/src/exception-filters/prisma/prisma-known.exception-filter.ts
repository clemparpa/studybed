import { Prisma } from '@prisma/client';
import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaKnownExceptionFilter implements ExceptionFilter {
  constructor(private table: string) {}
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const code = exception.code;

    switch (code) {
      case 'P2025':
        response.status(404).json({
          statusCode: 404,
          message: `Requested ${this.table} with clause not found`,
          error: 'Not Found',
        });
        break;
      default:
        response.status(400).json({
          statusCode: 400,
          message: exception.message,
          error: 'Bad Request',
          code,
        });
    }
  }
}
