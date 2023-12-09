import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { CourseService } from "./service/course.service";

@Component({
  selector: "app-course-shell",
  standalone: true,
  imports: [RouterOutlet],
  providers: [CourseService],
  template: ` <div
    class="pl-4 pr-4 flex flex-col items-center justify-start w-full xl:w-10/12 2xl:w-3/4"
  >
    <router-outlet></router-outlet>
  </div>`,
  styles: `
    :host {
      display: block;
      width: 100%;
      @apply flex flex-col items-center justify-start;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseShellComponent {}
