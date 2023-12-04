import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { catchError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CourseService {
  private http = inject(HttpClient);

  private api_host = "http://localhost:3000/course";

  public getCourses() {
    console.log("request");
    return this.http.get(this.api_host);
  }
}
