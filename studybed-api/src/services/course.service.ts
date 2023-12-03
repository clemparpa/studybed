import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { from, Observable } from 'rxjs';
import { files } from '@prisma/client';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  public getFiles = (): Observable<files[]> =>
    from(this.prisma.files.findMany());
}
