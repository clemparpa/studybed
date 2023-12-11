import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { AuthenticateUserWithCredentialsDto } from 'src/features/users/dto/user-credentials.dto';
import { map, firstValueFrom } from 'rxjs';
import { UserDto } from 'src/features/users/dto/user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'username_or_email',
      passwordField: 'password',
    });
  }

  validate(username_or_email: string, password: string): Promise<UserDto> {
    return firstValueFrom(
      this.authService
        .authenticate(new AuthenticateUserWithCredentialsDto({ credentials: username_or_email, password }))
        .pipe(
          map((user) => {
            if (!user) {
              throw new UnauthorizedException();
            }
            return user;
          }),
        ),
    );
  }
}
