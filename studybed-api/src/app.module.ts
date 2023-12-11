import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { CourseModule } from './features/courses/course.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PrismaModule } from 'nestjs-prisma';
import { UserModule } from './features/users/user.module';
import { AuthModule } from './features/auth/auth.module';
@Module({
  imports: [
    CourseModule,
    UserModule,
    AuthModule,
    PrismaModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
