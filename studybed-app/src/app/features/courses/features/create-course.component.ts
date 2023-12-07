import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CourseFormComponent } from "../ui/course-form.component";
import { MarkdownComponent } from "ngx-markdown";
import { signalSlice } from "ngxtension/signal-slice";
import { CourseForm } from "../models/course.model";
import { Observable, map } from "rxjs";

@Component({
  selector: "app-create-course",
  standalone: true,
  imports: [CourseFormComponent, MarkdownComponent],
  template: `
    <h1 class="text-3xl">Create Course</h1>
    <div class="w-full grid grid-cols-2 gap-4">
      <app-course-form
        (onChange)="courseState.onFormChange($event)"
        class="col-span-1"
      ></app-course-form>
      <div class="prose lg:prose-xl col-span-1">
        <markdown katex [data]="courseState.course()"></markdown>
      </div>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCourseComponent {
  private initState: CourseForm = {
    content: "",
    author: "",
    title: "",
    tags: [],
  };

  public courseState = signalSlice({
    initialState: this.initState,
    selectors: (state) => ({
      course: () => `
        # ${state().title}
        
        ${state().content}`,
    }),
    actionSources: {
      onFormChange: (state, formChange$: Observable<Partial<CourseForm>>) =>
        formChange$.pipe(map((change) => ({ ...state(), ...change }))),
    },
  });
}
