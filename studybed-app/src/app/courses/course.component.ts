import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
  Input,
  effect,
} from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { switchMap, filter, pipe, Subject, tap } from "rxjs";
import { CourseService } from "./course.service";
import { MarkdownComponent } from "ngx-markdown";
import { ContentCourseModel, CourseModel } from "./models/course.model";
import { injectParams } from "ngxtension/inject-params";
import { computedFrom } from "ngxtension/computed-from";
@Component({
  selector: "app-course",
  standalone: true,
  imports: [MarkdownComponent],
  template: `
    @if(course()){
    <div class="prose lg:prose-xl">
      <markdown katex [data]="course()!.content"></markdown>
    </div>
    }
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseComponent {
  courseService = inject(CourseService);

  urlPath = injectParams("urlPath");

  constructor() {
    effect(() => console.log("urlPath", this.urlPath()));
  }

  course = computedFrom(
    [this.urlPath],
    pipe(
      filter((path) => path !== null),
      switchMap((path) =>
        this.courseService.getCourseByUrl(path as unknown as string)
      )
    ),
    { initialValue: null }
  );
}
