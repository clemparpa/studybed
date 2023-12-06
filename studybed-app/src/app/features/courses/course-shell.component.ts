import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { CourseService } from "./course.service";

@Component({
  selector: "app-course-shell",
  standalone: true,
  imports: [RouterOutlet],
  providers: [CourseService],
  template: ` <router-outlet></router-outlet> `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseShellComponent {}
