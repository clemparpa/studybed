import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

const HOST = process.env.HOST ?? 'localhost';
const PORT = parseInt(process.env.PORT ?? '3000');
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
      methods: ['GET', 'PUT', 'POST'],
    },
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  await app.listen(PORT, HOST);
}
bootstrap();
