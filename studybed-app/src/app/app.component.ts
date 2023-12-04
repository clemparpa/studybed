import { Component, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { MarkdownComponent } from "ngx-markdown";
import { CourseService } from "./courses/course.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet, MarkdownComponent],
  template: `
    <div class="prose lg:prose-xl">
      <h1 class="text-red-300">Welcome to {{ title }}!</h1>
    </div>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent {
  title = "Studybed";

  private courseService = inject(CourseService);

  public data: any = null;

  constructor() {
    this.courseService.getCourses().subscribe((res) => (this.data = res));
  }
}
