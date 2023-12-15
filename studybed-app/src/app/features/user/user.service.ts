import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, catchError, map, of, tap } from "rxjs";
import { injectBackendAPI } from "../../utils/tokens";

@Injectable()
export class UserService {
  private http = inject(HttpClient);
  private apiPath = injectBackendAPI() + "/user";

  public isNameAlreadyExists(name: string): Observable<boolean> {
    return this.http
      .post<{ exists: boolean }>(`${this.apiPath}/name/exists`, {
        name,
      })
      .pipe(map(({ exists }) => exists));
  }

  public isEmailAlreadyExists(email: string): Observable<boolean> {
    return this.http
      .post<{ exists: boolean }>(`${this.apiPath}/email/exists`, {
        email,
      })
      .pipe(
        map(({ exists }) => exists),
        catchError(() => of(true))
      );
  }
}
