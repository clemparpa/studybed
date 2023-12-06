import { Routes } from "@angular/router";
import { CourseShellComponent } from "./course-shell.component";
import { CourseListComponent } from "./features/course-list.component";
import { CourseComponent } from "./features/course.component";
import { CreateCourseComponent } from "./features/create-course.component";

export default [
  {
    path: "",
    component: CourseShellComponent,
    children: [
      { path: "", component: CourseListComponent },
      { path: "content/:urlPath", component: CourseComponent },
      { path: "create", component: CreateCourseComponent },
    ],
  },
] as Routes;
