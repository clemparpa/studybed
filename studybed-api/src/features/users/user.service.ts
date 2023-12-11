import { Injectable, HttpException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserDto } from './dto/user.dto';
import { from, map } from 'rxjs';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import * as bcrypt from 'bcrypt';
import { AuthenticateUserWithCredentialsDto } from './dto/user-credentials.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  public authenticateUserWithCredentials(creds: AuthenticateUserWithCredentialsDto) {
    return from(
      this.prisma.user.findFirstOrThrow({ where: { OR: [{ email: creds.credentials }, { name: creds.credentials }] } }),
    ).pipe(
      map((user) => {
        if (bcrypt.compareSync(creds.password, user.password)) {
          return new UserDto(user);
        }
        throw new HttpException('Invalid credentials', 401);
      }),
    );
  }

  public getAllUsers() {
    return from(this.prisma.user.findMany()).pipe(map((users) => users.map((user) => new UserDto(user))));
  }

  public getUser(where: Prisma.UserWhereUniqueInput) {
    return from(this.prisma.user.findUniqueOrThrow({ where })).pipe(map((user) => new UserDto(user)));
  }

  public createUser(user: CreateUserDto) {
    return from(this.prisma.user.create({ data: user })).pipe(map((user) => new UserDto(user)));
  }

  public updateUser(where: Prisma.UserWhereUniqueInput, data: UpdateUserDto) {
    return from(this.prisma.user.update({ data, where })).pipe(map((user) => new UserDto(user)));
  }

  public deleteUser(where: Prisma.UserWhereUniqueInput) {
    return from(this.prisma.user.delete({ where })).pipe(map((user) => new UserDto(user)));
  }
}
