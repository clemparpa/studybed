import { Controller, Get, Query, UseFilters, Post, Body } from '@nestjs/common';
import { CourseService } from './data-access/course.service';
import { createPrismaFilter } from 'src/exception-filters/create-filter';
import { Prisma } from '@prisma/client';
import { TagFilter } from './interfaces/tag-filter.type';

@Controller('course')
@UseFilters(...createPrismaFilter('files'))
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Get()
  public getCourses() {
    return this.courseService.getCourses();
  }

  @Post('tags')
  public getCoursesByTags(@Body() tagFilter: TagFilter) {
    return this.courseService.getCourseByTags(tagFilter);
  }

  @Get('where')
  /**
   * Retrieves a unique course based on the provided query.
   *
   * @param {id | url_path} string - The query used to retrieve the unique course.
   */
  public getUniqueCourse(@Query() query: Prisma.filesWhereUniqueInput) {
    return this.courseService.getCourseWithContent(query);
  }
}
