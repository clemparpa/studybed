import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [],
  template: `
    <p>
      course works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseComponent {

}
