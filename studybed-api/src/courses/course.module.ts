import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { CourseService } from './data-access/course.service';
import { CourseController } from './course.controller';

@Module({
  imports: [],
  controllers: [CourseController],
  providers: [PrismaService, CourseService],
})
export class CourseModule {}
