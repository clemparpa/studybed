import { Prisma } from '@prisma/client';
import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';

@Catch(Prisma.PrismaClientUnknownRequestError)
export class PrismaUnknownExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientUnknownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(500).json({
      statusCode: 500,
      message: exception.message,
      error: 'Internal Server Error',
    });
  }
}
