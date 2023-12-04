import { file_tags } from '@prisma/client';

export interface FileModel<MetaData> {
  id: string;
  file_path: string;
  extension: string;
  url_path: string;
  filetype: string | null;
  metadata: MetaData;
}

export interface ContentFileModel<MetaData> extends FileModel<MetaData> {
  content: string;
}

export interface FileWithTagsModel<MetaData> extends FileModel<MetaData> {
  file_tags: file_tags[];
}
