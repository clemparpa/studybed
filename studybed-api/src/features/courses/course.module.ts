import { Module } from '@nestjs/common';
import { CourseService } from './data-access/course.service';
import { CourseController } from './course.controller';
import { CourseHelperService } from './data-access/course.helper.service';

@Module({
  imports: [],
  controllers: [CourseController],
  providers: [CourseHelperService, CourseService],
})
export class CourseModule {}
