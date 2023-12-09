import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { MarkdownComponent } from "ngx-markdown";

@Component({
  selector: "app-course-content",
  standalone: true,
  imports: [MarkdownComponent],
  template: `
    <div class="w-full !prose lg:!prose-xl !font-sans p-4">
      <markdown katex [data]="course"></markdown>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseContentComponent {
  @Input({ required: true }) course!: string;
}
