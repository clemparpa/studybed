import { Routes } from "@angular/router";
import { CourseComponent } from "./courses/course.component";

export const routes: Routes = [
  { component: CourseComponent, path: "course/:urlPath" },
];
