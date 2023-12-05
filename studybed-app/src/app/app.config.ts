import { ApplicationConfig } from "@angular/core";
import { provideHttpClient, HttpClient, withFetch } from "@angular/common/http";
import { provideRouter, withComponentInputBinding } from "@angular/router";
import { provideMarkdown } from "ngx-markdown";

import { routes } from "./app.routes";
import { provideClientHydration } from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideMarkdown({
      loader: HttpClient,
    }),
    provideAnimations(),
  ],
};
