import { Injectable, inject } from "@angular/core";
import { AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { map } from "rxjs";
import { UserService } from "./user.service";

@Injectable()
export class IsUserPropsExistsValidator {
  private user = inject(UserService);

  public isNameExists: AsyncValidatorFn = (control: AbstractControl<string>) =>
    this.user
      .isNameAlreadyExists(control.value.trim())
      .pipe(
        map((isTaken) =>
          isTaken ? { uniqueName: "Ce nom est déjà utilisé" } : null
        )
      );

  public isEmailExists: AsyncValidatorFn = (control: AbstractControl<string>) =>
    this.user
      .isEmailAlreadyExists(control.value.trim())
      .pipe(
        map((isTaken) =>
          isTaken ? { uniqueEmail: "Cet email est déjà utilisé" } : null
        )
      );
}
