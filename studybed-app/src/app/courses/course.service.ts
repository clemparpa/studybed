import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "../../environment/environment";
import { CourseModel, ContentCourseModel } from "./models/course.model";

@Injectable()
export class CourseService {
  private http = inject(HttpClient);

  private apiPath = environment.BACKEND_API;
  private coursePath = "course";

  public getCourses() {
    return this.http.get<CourseModel[]>(`${this.apiPath}/${this.coursePath}`);
  }

  public getCourseByUrl(url_path: string) {
    return this.http.get<ContentCourseModel>(
      `${this.apiPath}/${this.coursePath}/where`,
      {
        params: { url_path },
      }
    );
  }
}
