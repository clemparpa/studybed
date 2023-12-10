import { Module } from '@nestjs/common';
import { CourseModule } from './features/courses/course.module';

@Module({
  imports: [CourseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
