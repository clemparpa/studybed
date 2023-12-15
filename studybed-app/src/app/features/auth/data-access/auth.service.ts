import { Injectable, inject } from "@angular/core";
import { injectBackendAPI } from "../../../utils/tokens";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { CreateUserDto, LoginUserDto, User } from "../../user/user.model";

@Injectable()
export class AuthService {
  private http = inject(HttpClient);
  private apiPath = injectBackendAPI();

  public signUp(user: CreateUserDto): Observable<User> {
    return this.http.post<User>(`${this.apiPath}`, user);
  }

  public login(user: LoginUserDto): Observable<string> {
    return this.http
      .post<{ access_token: string }>(`${this.apiPath}/auth/login`, user)
      .pipe(map(({ access_token }) => access_token));
  }
}
