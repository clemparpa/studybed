import { Injectable, inject } from "@angular/core";
import { injectBackendAPI } from "../../../utils/tokens";
import { HttpClient } from "@angular/common/http";
import { Observable, map, switchMap, tap } from "rxjs";
import { CreateUserDto, LoginUserDto, User } from "../../user/user.model";
import { injectUser } from "../../user/user-state.service";

@Injectable()
export class AuthService {
  private http = inject(HttpClient);
  private apiPath = injectBackendAPI();
  private userState = injectUser();

  public signUp(createUserDto: CreateUserDto) {
    return this.http.post<User>(`${this.apiPath}/user`, createUserDto).pipe(
      tap((user) => this.userState.setUser(user)),
      switchMap(({ name }) =>
        this.login({
          username_or_email: name,
          password: createUserDto.password,
        })
      )
    );
  }

  public login(user: LoginUserDto) {
    return this.http
      .post<{ access_token: string }>(`${this.apiPath}/auth/login`, user)
      .pipe(
        tap(({ access_token }) => this.userState.setAccessToken(access_token))
      );
  }
}
