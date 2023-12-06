import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Output,
  EventEmitter,
} from "@angular/core";
import { FormInputComponent } from "../../../ui/form-input.component";
import { FormChipsInputComponent } from "../../../ui/form-chips-input.component";
import { FormTextareaComponent } from "../../../ui/form-textarea.component";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { CourseForm } from "../models/course.model";
import { MatButtonModule } from "@angular/material/button";

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
    <form
      [formGroup]="courseForm"
      (ngSubmit)="onSubmit.emit($any(courseForm.value))"
      class="grid grid-cols-2 gap-4"
    >
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

      <button
        [disabled]="courseForm.invalid"
        type="submit"
        mat-flat-button
        color="primary"
      >
        Submit
      </button>
    </form>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseFormComponent {
  @Output() onSubmit = new EventEmitter<CourseForm>();
  public courseForm = inject(FormBuilder).group({});
}
