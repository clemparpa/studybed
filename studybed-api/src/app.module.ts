import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './services/prisma.service';
import { CourseService } from './services/course.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PrismaService, CourseService],
})
export class AppModule {}
