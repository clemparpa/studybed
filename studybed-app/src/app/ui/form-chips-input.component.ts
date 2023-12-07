import { COMMA, ENTER } from "@angular/cdk/keycodes";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
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
import { MatChipInputEvent, MatChipsModule } from "@angular/material/chips";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: "app-form-chips-input",
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
  template: `
    <mat-form-field class="w-full">
      <mat-label>{{ label }}</mat-label>
      <mat-chip-grid
        #chipGrid
        aria-label="Enter Contents"
        [formControlName]="controlName"
      >
        @for (chip of control.value; track chip) {
        <mat-chip-row (removed)="removeChip(chip)">
          {{ chip }}
          <button matChipRemove [attr.aria-label]="'remove ' + chip">
            <mat-icon>cancel</mat-icon>
          </button>
        </mat-chip-row>
        }
        <input
          [placeholder]="placeholder"
          [matChipInputFor]="chipGrid"
          [matChipInputSeparatorKeyCodes]="separatorKeysCodes"
          [matChipInputAddOnBlur]="true"
          (matChipInputTokenEnd)="addChip($event)"
        />
      </mat-chip-grid>
      @if(control.hasError('required')){
      <mat-error>Un ou plusieurs choix sont obligatoires.</mat-error>
      } @if(control.hasError('minlength')){
      <mat-error>Au moins {{ this.minLength }} choix.</mat-error>
      } @if(control.hasError('maxlength')){
      <mat-error>Au plus {{ this.maxLength }} choix.</mat-error>
      }
    </mat-form-field>
  `,
  styles: `
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormChipsInputComponent {
  @Input({ required: true }) controlName!: string;
  @Input() placeholder: string = "";
  @Input() label?: string;
  @Input({ transform: booleanAttribute }) required: boolean = false;
  @Input({ transform: numberAttribute }) minLength?: number;
  @Input({ transform: numberAttribute }) maxLength?: number;

  parentContainer = inject(ControlContainer);
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  public get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }

  public get control() {
    return this.parentFormGroup.get(this.controlName) as AbstractControl<
      string[]
    >;
  }

  public addChip(tagToAddEvent: MatChipInputEvent) {
    if (tagToAddEvent.value.length > 0) {
      this.control.setValue([
        ...this.control.value,
        tagToAddEvent.value.trim(),
      ]);
    }
    tagToAddEvent.chipInput!.clear();
  }

  public removeChip(tagToRemove: string) {
    this.control.setValue(
      this.control.value.filter((tag) => tag !== tagToRemove)
    );
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
