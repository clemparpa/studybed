import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { MarkdownComponent } from "ngx-markdown";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet, MarkdownComponent],
  template: `
    <div class="prose lg:prose-xl">
      <h1 class="text-red-300">Welcome to {{ title }}!</h1>

      <markdown katex> $ x^2 + y^2 = z^2 $ </markdown>
    </div>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent {
  title = "studybed-app";
}
