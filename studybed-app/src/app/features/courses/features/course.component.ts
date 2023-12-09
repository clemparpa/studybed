import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { switchMap, filter, pipe } from "rxjs";
import { CourseService } from "../service/course.service";
import { MarkdownComponent } from "ngx-markdown";
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
