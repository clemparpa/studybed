import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common';
import { UserService } from './data-access/user.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { AuthenticateUserWithCredentialsDto } from './dto/user-credentials.dto';
import { AuthService } from './data-access/auth.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('login')
  public authenticateUserWithCredentials(@Body() credendials: AuthenticateUserWithCredentialsDto) {
    return this.authService.authenticate(credendials);
  }

  @Get()
  public getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('id')
  public getUserById(@Query('id') id: number) {
    return this.userService.getUser({ id });
  }

  @Get('email/')
  public getUserByEmail(@Query('email') email: string) {
    return this.userService.getUser({ email });
  }

  @Get('name/')
  public getUserByName(@Query('name') name: string) {
    return this.userService.getUser({ name });
  }

  @Post()
  public createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Patch('id/')
  public updateUserById(@Query('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser({ id }, updateUserDto);
  }

  @Patch('name/')
  public updateUserByName(@Query('name') name: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser({ name }, updateUserDto);
  }

  @Patch('email/')
  public updateUserByEmail(@Query('email') email: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser({ email }, updateUserDto);
  }

  @Delete('id/')
  public deleteUserById(@Query('id') id: number) {
    return this.userService.deleteUser({ id });
  }

  @Delete('name/')
  public deleteUserByName(@Query('name') name: string) {
    return this.userService.deleteUser({ name });
  }

  @Delete('email/')
  public deleteUserByEmail(@Query('email') email: string) {
    return this.userService.deleteUser({ email });
  }
}
