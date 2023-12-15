import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { FormInputComponent } from "../../../ui/form-input.component";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { GroupType } from "../../../utils/group-type";
import { CreateUserDto } from "../../user/user.model";
import { IsUserPropsExistsValidator } from "../../user/user.validator";
import { MatButtonModule } from "@angular/material/button";
import { RouterLink } from "@angular/router";
import { AuthService } from "../data-access/auth.service";

@Component({
  selector: "app-sign-up",
  standalone: true,
  providers: [IsUserPropsExistsValidator],
  imports: [
    FormInputComponent,
    ReactiveFormsModule,
    MatButtonModule,
    RouterLink,
  ],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <app-form-input
        label="Nom"
        controlName="name"
        minLength="5"
        maxLength="255"
        placeholder="Jean-marc"
        [asyncValidator]="userPropsValidator.isNameExists"
        asyncError="uniqueName"
        required
      />

      <app-form-input
        label="Email"
        controlName="email"
        type="email"
        placeholder="jean.marc@example.com"
        [asyncValidator]="userPropsValidator.isEmailExists"
        asyncError="uniqueEmail"
        required
      />

      <app-form-input
        label="Mot de passe"
        controlName="password"
        type="password"
        minLength="8"
        maxLength="50"
        required
      />

      <p>
        Vous avez déja un compte ?
        <a [routerLink]="['/auth', 'login']">Se connecter</a>
      </p>

      <button mat-flat-button color="accent" [disabled]="form.invalid">
        S'inscrire
      </button>
    </form>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SignUpComponent {
  public userPropsValidator = inject(IsUserPropsExistsValidator);
  public auth = inject(AuthService);
  public form = new FormGroup({} as GroupType<CreateUserDto>);

  public onSubmit(): void {
    this.auth.signUp(this.form.value as CreateUserDto).subscribe();
  }
}
