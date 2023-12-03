import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CourseService } from './services/course.service';
import { files } from '@prisma/client';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly coursesService: CourseService,
  ) {}

  @Get()
  getFiles(): Observable<files[]> {
    return this.coursesService.getFiles();
  }
}
