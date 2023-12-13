import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-sign-up",
  standalone: true,
  imports: [],
  template: ` <p>sign-up works!</p> `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SignUpComponent {}
