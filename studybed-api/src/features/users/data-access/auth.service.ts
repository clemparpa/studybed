import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthenticateUserWithCredentialsDto } from '../dto/user-credentials.dto';
import { map } from 'rxjs';
import * as bcrypt from 'bcrypt';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class AuthService {
  constructor(private user: UserService) {}

  public authenticate({ credentials, password }: AuthenticateUserWithCredentialsDto) {
    return this.user.getUserWithCredentials(credentials).pipe(
      map((user) => {
        if (bcrypt.compareSync(password, user.password)) {
          return new UserDto(user);
        }
        throw new UnauthorizedException();
      }),
    );
  }
}
