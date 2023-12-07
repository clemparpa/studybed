import {
  ChangeDetectionStrategy,
  Component,
  Output,
  EventEmitter,
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormInputComponent } from "../../../ui/form-input.component";
import { FormChipsInputComponent } from "../../../ui/form-chips-input.component";
import { FormTextareaComponent } from "../../../ui/form-textarea.component";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { CourseForm } from "../models/course.model";
import { MatButtonModule } from "@angular/material/button";
import { tap } from "rxjs";

@Component({
  selector: "app-course-form",
  standalone: true,
  imports: [
    FormInputComponent,
    FormChipsInputComponent,
    FormTextareaComponent,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  template: `
    <form [formGroup]="courseForm" class="grid grid-cols-2 gap-4">
      <app-form-input
        class="col-span-1"
        controlName="title"
        label="Titre"
        required
        minLength="3"
        maxLength="30"
      />

      <app-form-input
        class="col-span-1"
        controlName="author"
        label="Auteur"
        required
        minLength="1"
        maxLength="30"
      />

      <app-form-chips-input
        class="col-span-2"
        controlName="tags"
        placeholder="Choississez des tags"
        label="Tags"
        required
        minLength="2"
        maxLength="5"
      />

      <app-form-textarea
        class="col-span-2"
        controlName="content"
        label="Contenu"
        required
        minLength="10"
        rows="20"
        placeholder="## Definitions 
        Soit ..."
      />
    </form>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseFormComponent {
  @Output() onChange = new EventEmitter<Partial<CourseForm>>();

  public courseForm = new FormGroup({} as GroupType<CourseForm>);

  constructor() {
    this.courseForm.valueChanges
      .pipe(
        tap((value) => this.onChange.emit(value)),
        takeUntilDestroyed()
      )
      .subscribe();
  }
}

export type GroupType<T> = {
  [K in keyof T]: FormControl<T[K]>;
};
