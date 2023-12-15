import { Routes } from "@angular/router";
import { AuthShellComponent } from "./auth-shell.component";
import { UserService } from "../user/user.service";

export default [
  {
    component: AuthShellComponent,
    path: "",
    providers: [UserService],
    children: [
      {
        path: "",
        redirectTo: "login",
        pathMatch: "full",
      },
      {
        path: "login",
        loadComponent: () => import("./features/login.component"),
      },
      {
        path: "sign-up",
        loadComponent: () => import("./features/sign-up.component"),
      },
      {
        path: "reset-password",
        loadComponent: () => import("./features/reset-password.component"),
      },
    ],
  },
] as Routes;
