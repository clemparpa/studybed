import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { CourseModule } from './features/courses/course.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
@Module({
  imports: [CourseModule],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
