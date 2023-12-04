import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import { ZodObject } from 'zod';

@Injectable()
export class FileService {
  public parseMetaData<MetaData>(
    { metadata }: { metadata: string | null },
    schema: ZodObject<any, any, any, MetaData, any>,
  ): MetaData {
    return schema.parse(metadata ? JSON.parse(metadata) : {});
  }

  public readContent({ file_path }: { file_path: string }, rootPath: string) {
    return readFileSync(join(rootPath, file_path).replace('\\', '/')).toString();
  }
}
