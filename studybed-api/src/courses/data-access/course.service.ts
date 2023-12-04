import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { from, Observable, map } from 'rxjs';
import { Prisma } from '@prisma/client';
import { TagFilter } from '../interfaces/tag-filter.type';
import { FileService } from 'src/services/file.service';
import { CourseMetaDataSchema } from '../models/course-metadata.model';
import { ContentCourseModel, CourseModel } from '../models/course.model';
import { FileWithTagsModel } from 'src/models/file.model';

@Injectable()
export class CourseService {
  constructor(
    private prisma: PrismaService,
    private file: FileService,
  ) {}

  private rootPath: string =
    process.env.MARKDOWN_DB_ROOT ?? 'C:/Users/talal/Desktop/CLIENT_PROJECTS/studybed/markdowndb';

  public getCourses(): Observable<CourseModel[]> {
    return from(this.prisma.files.findMany()).pipe(
      map((files) => files.map((file) => this.file.withMetaData(file, CourseMetaDataSchema))),
    );
  }

  public getCourseWithContent(where: Prisma.filesWhereUniqueInput): Observable<ContentCourseModel> {
    return this.getCourseUniqueWhere(where).pipe(
      map((file) => this.file.withMetaData(file, CourseMetaDataSchema)),
      map((file) => this.file.withContent(file, this.rootPath)),
    );
  }

  public getCourseByTags({ type, tags }: TagFilter): Observable<CourseModel[]> {
    return this.getCoursesWhere({ file_tags: { [type]: { tags: { name: { in: tags } } } } }).pipe(
      map((files) => files.map((file) => this.file.withMetaData(file, CourseMetaDataSchema))),
    );
  }

  private getCourseUniqueWhere = (where: Prisma.filesWhereUniqueInput): Observable<FileWithTagsModel<string | null>> =>
    from(
      this.prisma.files.findUniqueOrThrow({
        where,
        include: {
          file_tags: true,
        },
      }),
    );

  private getCoursesWhere = (where: Prisma.filesWhereInput): Observable<FileWithTagsModel<string | null>[]> =>
    from(
      this.prisma.files.findMany({
        include: {
          file_tags: true,
        },
        where,
      }),
    );
}
