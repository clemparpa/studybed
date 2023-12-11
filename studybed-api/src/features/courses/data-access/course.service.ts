import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { course } from '@prisma/client';
import { TagFilter } from '../interfaces/tag-filter.type';
import { CourseHelperService } from './course.helper.service';

@Injectable()
export class CourseService {
  constructor(private courseHelper: CourseHelperService) {}

  public getAllCourses(): Observable<course[]> {
    return this.courseHelper.getCourses({});
  }

  public getCoursesByTags({ type, tags }: TagFilter) {
    return this.courseHelper.getCourses(this.courseHelper.whereTagsIn({ type, tags }));
  }

  public getCourseById(id: number) {
    return this.courseHelper.getCourse({ id });
  }

  public getCourseByTitle(title: string) {
    return this.courseHelper.getCourse({ title });
  }
}
