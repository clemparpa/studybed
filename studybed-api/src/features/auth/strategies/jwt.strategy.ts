import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtUserPayload } from '../interface/jwt-payload.type';
import { UserDto } from 'src/features/users/dto/user.dto';
import { userFromJwtPayload } from '../auth-user.interop';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  validate(payload: JwtUserPayload): UserDto {
    return userFromJwtPayload(payload);
  }
}
