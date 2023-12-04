import { Component, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { MarkdownComponent } from "ngx-markdown";
import { CourseService } from "./course.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet, MarkdownComponent],
  template: `
    <div class="prose lg:prose-xl">
      <h1 class="text-red-300">Welcome to {{ title }}!</h1>

      <markdown katex> $ x^2 + y^2 = z^2 $ </markdown>

      {{ data ?? {} | json }}
    </div>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent {
  title = "studybed-app";

  private courseService = inject(CourseService);

  // public courses = toSignal(this.courseService.getCourses());

  public data: any = null;

  constructor() {
    this.courseService.getCourses().subscribe((res) => (this.data = res));
  }
}
