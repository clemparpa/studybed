import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CourseFormComponent } from "../ui/course-form.component";

@Component({
  selector: "app-create-course",
  standalone: true,
  imports: [CourseFormComponent],
  template: ` <app-course-form></app-course-form> `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCourseComponent {}
