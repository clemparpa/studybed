import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-reset-password",
  standalone: true,
  imports: [],
  template: ` <p>reset-password works!</p> `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ResetPasswordComponent {}
