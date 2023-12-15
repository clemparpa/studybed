import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { injectUser } from "../user/user-state.service";
import { injectBackendAPI } from "../../utils/tokens";

export const authTokenInterceptor = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const user = injectUser();
  if (req.url.startsWith(injectBackendAPI()) && user.access_token()) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${user.access_token()}`,
      },
    });
  }
  return next(req);
};
