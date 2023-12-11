import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/services/prisma.service';
import { from, map } from 'rxjs';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

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
