import { PrismaValidationExceptionFilter } from './prisma-validation.exception-filter';
import { PrismaKnownExceptionFilter } from './prisma-known.exception-filter';
import { PrismaUnknownExceptionFilter } from './prisma-unknown.exception-filter';

export const createPrismaFilter = (table: string) => [
  new PrismaValidationExceptionFilter(),
  new PrismaUnknownExceptionFilter(),
  new PrismaKnownExceptionFilter(table),
];
