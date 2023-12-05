import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { CourseModel } from "./models/course.model";
import { CourseCardComponent } from "./course-card.component";

@Component({
  selector: "app-course-list",
  standalone: true,
  imports: [CourseCardComponent],
  template: `
    @for( course of courseList; track course.id ){
    <app-course-card [course]="course"></app-course-card>
    }
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseListComponent {
  @Input() courseList: CourseModel[] = [];
}
