import { Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { Prisma, course } from '@prisma/client';
import { TagFilter } from '../interfaces/tag-filter.type';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class CourseHelperService {
  constructor(private prisma: PrismaService) {}

  public getCourses(where: Prisma.courseWhereInput) {
    return from(
      this.prisma.course.findMany({
        where: {
          ...where,
          ...this.wherePublished,
        },
        select: this.selectCourse,
      }),
    );
  }

  public getCourse(where: Prisma.courseWhereUniqueInput): Observable<course> {
    return from(
      this.prisma.course.findUniqueOrThrow({
        where: {
          ...where,
          ...this.wherePublished,
        },
        select: {
          ...this.selectCourse,
          content: true,
        },
      }),
    );
  }

  public wherePublished = {
    published: {
      equals: true,
    },
  };

  public whereTagsIn({ type, tags }: TagFilter) {
    return { tags: { [type]: { name: { in: tags } } } };
  }

  public selectCourse: Prisma.courseSelect = {
    author: { select: { name: true } },
    content: false,
    id: true,
    title: true,
    createdAt: true,
    authorId: false,
    published: false,
    updatedAt: false,
    tags: { select: { name: true } },
  };
}
