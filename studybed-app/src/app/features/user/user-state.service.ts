import { User } from "./user.model";
import { createInjectionToken } from "ngxtension/create-injection-token";
import { signalSlice } from "ngxtension/signal-slice";
import { Observable, map } from "rxjs";

export const [injectUser, provideUser] = createInjectionToken(() => {
  return signalSlice({
    initialState: {
      access_token: null as string | null,
      user: null as User | null,
    },
    actionSources: {
      setAccessToken: (_state, access_token$: Observable<string>) =>
        access_token$.pipe(map((access_token) => ({ access_token }))),
      setUser: (_state, user$: Observable<User>) =>
        user$.pipe(map((user) => ({ user }))),
    },
  });
});
