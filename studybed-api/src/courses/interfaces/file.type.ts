import { file_tags, files } from '@prisma/client';

export type FileWithContent = files & { content: string };
export type FileWithTags = files & { file_tags: file_tags[] };
