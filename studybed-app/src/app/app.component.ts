import { Component, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { MarkdownComponent } from "ngx-markdown";
import { CourseService } from "./courses/course.service";
import { CourseListComponent } from "./courses/course-list.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet, MarkdownComponent, CourseListComponent],
  providers: [CourseService],
  template: `
    <div class="prose lg:prose-xl">
      <h1 class="text-red-300">Welcome to {{ title }}!</h1>
    </div>

    <!-- <app-course-list [courseList]="courses()"></app-course-list> -->

    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent {
  title = "Studybed";

  public courses = toSignal(inject(CourseService).getCourses(), {
    initialValue: [],
  });
}
