import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { CourseService } from './data-access/course.service';
import { CourseController } from './course.controller';
import { FileService } from 'src/services/file.service';

@Module({
  imports: [],
  controllers: [CourseController],
  providers: [PrismaService, CourseService, FileService],
})
export class CourseModule {}
