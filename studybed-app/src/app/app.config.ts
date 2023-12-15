import { ApplicationConfig } from "@angular/core";
import {
  provideHttpClient,
  HttpClient,
  withFetch,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  withInterceptors,
} from "@angular/common/http";
import { provideRouter, withComponentInputBinding } from "@angular/router";
import { MARKED_OPTIONS, MarkedRenderer, provideMarkdown } from "ngx-markdown";

import { routes } from "./app.routes";
import { provideClientHydration } from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideBackendAPI } from "./utils/tokens";
import { environment } from "../environment/environment";
import { Observable } from "rxjs";

export function loggingInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  console.log(req);
  return next(req);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    // provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptors([loggingInterceptor])),
    provideMarkdown({
      loader: HttpClient,
      markedOptions: {
        provide: MARKED_OPTIONS,
        useFactory: () => {
          const renderer = new MarkedRenderer();

          renderer.blockquote = (text: string) => {
            return `<blockquote class="first:!mt-0 last:!mb-0">${text}</blockquote>`;
          };
          return {
            renderer: renderer,
            gfm: true,
            breaks: false,
            pedantic: false,
          };
        },
      },
    }),
    provideAnimations(),
    provideBackendAPI(environment.BACKEND_BROWSER_API),
  ],
};
