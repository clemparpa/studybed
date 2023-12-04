import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-course-list",
  standalone: true,
  imports: [],
  template: ` <p>course-list works!</p> `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseListComponent {}
