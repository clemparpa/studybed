import { ApplicationConfig } from "@angular/core";
import { provideHttpClient, HttpClient, withFetch } from "@angular/common/http";
import { provideRouter } from "@angular/router";
import { provideMarkdown } from "ngx-markdown";

import { routes } from "./app.routes";
import { provideClientHydration } from "@angular/platform-browser";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideMarkdown({
      loader: HttpClient,
    }),
  ],
};
