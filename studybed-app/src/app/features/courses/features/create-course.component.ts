import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { CourseFormComponent } from "../ui/course-form.component";
import { MarkdownComponent, MarkdownService } from "ngx-markdown";
import { signalSlice } from "ngxtension/signal-slice";
import { CourseForm } from "../models/course.model";
import { Observable, map } from "rxjs";
import { CourseContentComponent } from "../ui/course-content.component";
import { FormControlStatus } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-create-course",
  standalone: true,
  imports: [
    CourseFormComponent,
    MarkdownComponent,
    CourseContentComponent,
    MatButtonModule,
  ],
  template: `
    <div class="flex items-center justify-start pt-4 pb-4 gap-8">
      <h1 class="text-4xl font-ui text-neutral-800 p-0 m-0">
        Création de cours
      </h1>
      <button
        mat-flat-button
        color="primary"
        [disabled]="courseState.invalid()"
      >
        Enregistrer
      </button>
    </div>
    <div class="w-full grid grid-cols-2 gap-8">
      <app-course-form
        (valueChange)="courseState.onValueChange($event)"
        (statusChange)="courseState.onStatusChange($any($event))"
        class="col-span-1 w-full"
      ></app-course-form>
      <app-course-content class="col-span-1" [course]="courseState.course()" />
    </div>
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCourseComponent {
  private initState: CourseForm & { status: FormControlStatus } = {
    content: "",
    author: "",
    title: "",
    tags: [],
    status: "INVALID",
  };

  public courseState = signalSlice({
    initialState: this.initState,
    selectors: (state) => ({
      course: () => `
        # ${state().title}
        
        ${state().content}`,

      invalid: () => state().status !== "VALID",
    }),
    actionSources: {
      onValueChange: (state, valueChange$: Observable<Partial<CourseForm>>) =>
        valueChange$.pipe(map((change) => ({ ...state(), ...change }))),
      onStatusChange: (state, statusChange$: Observable<FormControlStatus>) =>
        statusChange$.pipe(map((status) => ({ ...state(), status }))),
    },
  });
}
