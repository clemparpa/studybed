import { Transform, Exclude } from 'class-transformer';
import { IsEmail, IsInt, Length, MaxLength, MinLength } from 'class-validator';
import { OmitType, PartialType } from '@nestjs/swagger';
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
  @Transform(({ value }) => bcrypt.hashSync(value, 8))
  @Length(60, 60)
  public password: string;

  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial);
  }
}

export class CreateUserDto extends OmitType(UserDto, ['id'] as const) {}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
