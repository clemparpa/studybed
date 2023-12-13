import { Routes } from "@angular/router";

export const routes: Routes = [
  { path: "", redirectTo: "course", pathMatch: "full" },
  {
    path: "course",
    loadChildren: () => import("./features/courses/course.routes"),
  },
  {
    path: "auth",
    loadChildren: () => import("./features/auth/auth.routes"),
  },
];
