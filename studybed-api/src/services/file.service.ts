import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import { FileModel } from 'src/models/file.model';
import { ZodObject } from 'zod';
import * as matter from 'gray-matter';

@Injectable()
export class FileService {
  public withMetaData<MetaData>(
    file: FileModel<string | null>,
    schema: ZodObject<any, any, any, MetaData, any>,
  ): FileModel<MetaData> {
    return {
      ...file,
      metadata: schema.parse(file.metadata ? JSON.parse(file.metadata) : {}),
    };
  }

  public withContent(file: FileModel<any>, rootPath: string) {
    return {
      ...file,
      content: matter(readFileSync(join(rootPath, file.file_path).replace('\\', '/')).toString()).content,
    };
  }
}
