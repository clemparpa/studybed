import { UserDto } from '../users/dto/user.dto';
import { JwtUserPayload } from './interface/jwt-payload.type';

export const usertoJwtPayload = (user: UserDto): JwtUserPayload => ({
  sub: user.id,
  username: user.name,
});

export const userFromJwtPayload = (payload: JwtUserPayload): UserDto =>
  new UserDto({
    name: payload.username,
    id: payload.sub,
  });
