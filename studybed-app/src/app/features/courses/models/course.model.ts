export type CourseMetaData = {
  title: string;
  tags: string[];
  author: string;
};

export type CourseForm = CourseMetaData & {
  content: string;
};

export type CourseModel = {
  id: string;
  file_path: string;
  extension: string | null;
  url_path: string;
  filetype: string | null;
  metadata: CourseMetaData;
};

export type ContentCourseModel = CourseModel & { content: string };
