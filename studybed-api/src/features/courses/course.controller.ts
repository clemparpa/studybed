import { Controller, Get, Query, Post, Body, ParseIntPipe } from '@nestjs/common';
import { CourseService } from './data-access/course.service';
import { TagFilter } from './interfaces/tag-filter.type';

@Controller('course')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Get()
  public getCourses() {
    return this.courseService.getAllCourses();
  }

  @Post('tags')
  public getCoursesByTags(@Body() tagFilter: TagFilter) {
    return this.courseService.getCoursesByTags(tagFilter);
  }

  @Get('where')
  public getCourseByTitle(@Query('title') title: string) {
    return this.courseService.getCourseByTitle(title);
  }

  @Get('where')
  public getCourseById(@Query('id', ParseIntPipe) id: number) {
    return this.courseService.getCourseById(id);
  }
}
