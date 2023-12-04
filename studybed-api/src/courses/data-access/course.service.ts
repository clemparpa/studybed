import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { from, Observable, map } from 'rxjs';
import { files, Prisma } from '@prisma/client';
import { readFileSync } from 'fs';
import { join } from 'path';
import { TagFilter } from '../interfaces/tag-filter.type';
import { FileWithContent, FileWithTags } from '../interfaces/file.type';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  private rootPath: string =
    process.env.MARKDOWN_DB_ROOT ?? 'C:/Users/talal/Desktop/CLIENT_PROJECTS/studybed/markdowndb';

  public getCourses = (): Observable<FileWithTags[]> =>
    from(this.prisma.files.findMany({ include: { file_tags: true } }));

  public getCourseWithContent(where: Prisma.filesWhereUniqueInput): Observable<FileWithContent> {
    return this.getCourseUniqueWhere(where).pipe(map(this.withFileContent));
  }

  public getCourseByTags({ type, tags }: TagFilter): Observable<FileWithTags[]> {
    return this.getCoursesWhere({ file_tags: { [type]: { tags: { name: { in: tags } } } } });
  }

  private withFileContent = (file: files): FileWithContent => ({
    ...file,
    content: readFileSync(join(this.rootPath, file.file_path).replace('\\', '/')).toString(),
  });

  private getCourseUniqueWhere = (where: Prisma.filesWhereUniqueInput): Observable<FileWithTags> =>
    from(
      this.prisma.files.findUniqueOrThrow({
        where,
        include: {
          file_tags: true,
        },
      }),
    );

  private getCoursesWhere = (where: Prisma.filesWhereInput): Observable<FileWithTags[]> =>
    from(
      this.prisma.files.findMany({
        include: {
          file_tags: true,
        },
        where,
      }),
    );
}
