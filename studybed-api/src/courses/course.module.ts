import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { CourseService } from './data-access/course.service';
import { CourseController } from './course.controller';
import { CourseHelperService } from './data-access/course.helper.service';

@Module({
  imports: [],
  controllers: [CourseController],
  providers: [PrismaService, CourseHelperService, CourseService],
})
export class CourseModule {}
