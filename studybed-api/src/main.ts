import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const HOST = process.env.HOST ?? 'localhost';
const PORT = parseInt(process.env.PORT ?? '3000');
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
      methods: ['GET', 'PUT', 'POST'],
    },
  });
  await app.listen(PORT, HOST);
}
bootstrap();
