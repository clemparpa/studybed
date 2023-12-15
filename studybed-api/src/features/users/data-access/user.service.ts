import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserDto } from '../dto/user.dto';
import { from, map } from 'rxjs';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  public getUserWithCredentials(email_or_password: string) {
    return from(
      this.prisma.user.findFirstOrThrow({ where: { OR: [{ email: email_or_password }, { name: email_or_password }] } }),
    );
  }

  public isUserFieldAlreadyExists(where: Prisma.UserWhereUniqueInput) {
    return from(this.prisma.user.findUnique({ select: { id: true }, where })).pipe(map((user) => ({ exists: !!user })));
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
