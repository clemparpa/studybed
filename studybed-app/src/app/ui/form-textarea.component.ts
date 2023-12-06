import {
  ChangeDetectionStrategy,
  Component,
  Input,
  booleanAttribute,
  inject,
  numberAttribute,
} from "@angular/core";
import {
  AbstractControl,
  ControlContainer,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: "app-form-textarea",
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
  template: `
    <mat-form-field class="w-full">
      <mat-label>{{ label }}</mat-label>
      <textarea
        [formControlName]="controlName"
        [rows]="rows"
        class="h-auto resize-none"
        matInput
        [placeholder]="placeholder"
      ></textarea>
      @if(control.hasError('required')){
      <mat-error>Ce champ est obligatoire.</mat-error>
      } @if(control.hasError('minlength')){
      <mat-error
        >Ce champ doit avoir au moins {{ minLength }} caractères.</mat-error
      >
      } @if(control.hasError('maxlength')){
      <mat-error
        >Ce champ doit avoir au plus {{ maxLength }} caractères.</mat-error
      >
      }
    </mat-form-field>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormTextareaComponent {
  @Input({ required: true }) controlName!: string;
  @Input() placeholder: string = "";
  @Input() label?: string;
  @Input({ required: true, transform: numberAttribute }) rows!: number;
  @Input({ transform: booleanAttribute }) required: boolean = false;
  @Input({ transform: numberAttribute }) minLength?: number;
  @Input({ transform: numberAttribute }) maxLength?: number;

  parentContainer = inject(ControlContainer);

  public get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }
  public get control() {
    return this.parentFormGroup.get(this.controlName) as AbstractControl<
      string[]
    >;
  }

  ngOnInit() {
    this.parentFormGroup.addControl(
      this.controlName,
      new FormControl([] as string[], [
        ...(this.required ? [Validators.required] : []),
        ...(this.minLength !== undefined
          ? [Validators.minLength(this.minLength)]
          : []),
        ...(this.maxLength !== undefined
          ? [Validators.maxLength(this.maxLength)]
          : []),
      ])
    );
  }

  ngOnDestroy(): void {
    this.parentFormGroup.removeControl(this.controlName);
  }
}
