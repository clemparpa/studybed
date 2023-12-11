import { Injectable } from '@nestjs/common';
import { UserService } from '../users/data-access/user.service';
import { AuthenticateUserWithCredentialsDto } from '../users/dto/user-credentials.dto';
import { map } from 'rxjs';
import * as bcrypt from 'bcrypt';
import { Observable } from 'rxjs';
import { UserDto } from '../users/dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { usertoJwtPayload } from './auth-user.interop';

@Injectable()
export class AuthService {
  constructor(
    private user: UserService,
    private jwtService: JwtService,
  ) {}

  public authenticate({ credentials, password }: AuthenticateUserWithCredentialsDto): Observable<UserDto | null> {
    return this.user.getUserWithCredentials(credentials).pipe(
      map((user) => {
        if (bcrypt.compareSync(password, user.password)) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          return new UserDto(user);
        }
        return null;
      }),
    );
  }

  public login(user: UserDto): { access_token: string } {
    return {
      access_token: this.jwtService.sign(usertoJwtPayload(user)),
    };
  }
}
