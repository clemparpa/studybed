import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
  OnDestroy,
  booleanAttribute,
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
  selector: "app-form-input",
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
      @if(label){
      <mat-label>{{ label }}</mat-label>
      }
      <input
        [formControlName]="controlName"
        [placeholder]="placeholder"
        matInput
      />
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
export class FormInputComponent implements OnInit, OnDestroy {
  @Input({ required: true }) controlName!: string;
  @Input() label?: string;
  @Input() placeholder: string = "";
  @Input({ transform: booleanAttribute }) required: boolean = false;
  @Input({ transform: numberAttribute }) minLength?: number;
  @Input({ transform: numberAttribute }) maxLength?: number;

  parentContainer = inject(ControlContainer);

  public get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }

  public get control() {
    return this.parentFormGroup.get(this.controlName) as AbstractControl;
  }

  ngOnInit() {
    this.parentFormGroup.addControl(
      this.controlName,
      new FormControl("", [
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
