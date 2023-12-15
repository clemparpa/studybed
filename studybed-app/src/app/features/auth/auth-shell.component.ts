import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { AuthService } from "./data-access/auth.service";

@Component({
  selector: "app-auth-shell",
  standalone: true,
  providers: [AuthService],
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet> `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthShellComponent {}
