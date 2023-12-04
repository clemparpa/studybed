import { z } from 'zod';

export const CourseMetaDataSchema = z.object({
  title: z.string(),
  tags: z.array(z.string()),
  author: z.string(),
});

export type CourseMetaData = z.infer<typeof CourseMetaDataSchema>;
