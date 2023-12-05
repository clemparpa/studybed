import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { CourseModel } from "./models/course.model";

@Component({
  selector: "app-course-card",
  standalone: true,
  imports: [],
  template: `
    <div
      class="flex flex-col justify-center items-stretch rounded-lg border-2 border-solid border-neutral-900 max-md:max-w-full"
    >
      <div
        class="flex flex-col items-stretch pl-5 pr-3 py-3 rounded-lg border-2 border-solid border-neutral-900 max-md:max-w-full"
      >
        <div
          class="flex justify-between gap-5 items-start max-md:max-w-full max-md:flex-wrap"
        >
          <div class="text-zinc-800 text-2xl font-semibold whitespace-nowrap">
            {{ course.metadata.title }}
          </div>
          <div class="text-neutral-700 text-sm italic whitespace-nowrap">
            <span class="text-zinc-800">par:</span>
            <span class="text-neutral-700">{{ course.metadata.author }}</span>
          </div>
        </div>
        <div
          class="flex items-stretch gap-2.5 mt-2.5 self-start max-md:justify-center"
        >
          @for( tag of course.metadata.tags; track tag){
          <div
            class="text-neutral-200 text-sm whitespace-nowrap rounded bg-indigo-400 grow justify-center items-stretch px-4 py-2"
          >
            {{ tag }}
          </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseCardComponent {
  @Input() course!: CourseModel;
}
