import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class AuthenticateUserWithCredentialsDto {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  public credentials: string;

  @Exclude({ toPlainOnly: true })
  @MaxLength(60)
  @IsString()
  @IsNotEmpty()
  public password: string;

  constructor(partial: AuthenticateUserWithCredentialsDto) {
    Object.assign(this, partial);
  }
}
