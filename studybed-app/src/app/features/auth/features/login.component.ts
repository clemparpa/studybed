import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormInputComponent } from "../../../ui/form-input.component";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [FormInputComponent, ReactiveFormsModule],
  template: `
    <form [formGroup]="form">
      <app-form-input
        label="Nom"
        controlName="name"
        minLength="3"
        maxLength="30"
        placeholder="Jean-marc"
        required
      />

      <app-form-input
        label="Email"
        controlName="email"
        type="email"
        placeholder="jean.marc@example.com"
        required
      />

      <app-form-input
        label="Mot de passe"
        controlName="password"
        type="password"
        required
      />
    </form>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent {
  public form = new FormGroup({});
}
