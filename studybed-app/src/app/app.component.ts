import { Component, inject } from "@angular/core";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import {
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
} from "@angular/material/core";
import { RouterOutlet } from "@angular/router";
import { MatToolbarModule } from "@angular/material/toolbar";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: "outline" },
    },
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
  ],
  template: `
    <mat-toolbar color="primary">
      <span>StudyBed App</span>
    </mat-toolbar>

    <main class="mt-6 w-full flex flex-col items-center justify-start">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: `
  `,
})
export class AppComponent {}
