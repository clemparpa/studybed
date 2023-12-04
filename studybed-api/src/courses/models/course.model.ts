import { ContentFileModel, FileModel } from 'src/models/file.model';
import { CourseMetaData } from './course-metadata.model';

export interface CourseModel extends FileModel<CourseMetaData> {}
export interface ContentCourseModel extends ContentFileModel<CourseMetaData> {}
