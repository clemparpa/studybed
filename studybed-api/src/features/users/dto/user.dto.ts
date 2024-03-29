import { Transform, Exclude } from 'class-transformer';
import { IsEmail, IsInt, Length, MaxLength, MinLength } from 'class-validator';
import { OmitType, PartialType, PickType } from '@nestjs/mapped-types';
import * as bcrypt from 'bcrypt';

export class UserDto {
  @IsInt()
  public id: number;

  @IsEmail()
  @MaxLength(255)
  public email: string;

  @MinLength(5)
  @MaxLength(255)
  public name: string;

  @Exclude({ toPlainOnly: true })
  @Transform(({ value }) => bcrypt.hashSync(value, parseInt(process.env.SALT as string)))
  @Length(60, 60)
  public password: string;

  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial);
  }
}

export class UserEmailDto extends PickType(UserDto, ['email'] as const) {}
export class UserNameDto extends PickType(UserDto, ['name'] as const) {}

export class CreateUserDto extends OmitType(UserDto, ['id'] as const) {}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
