import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  public getUserById(@Query('id') id: number) {
    return this.userService.getUser({ id });
  }

  @Get()
  public getUserByEmail(@Query('email') email: string) {
    return this.userService.getUser({ email });
  }

  @Get()
  public getUserByName(@Query('name') name: string) {
    return this.userService.getUser({ name });
  }

  @Post()
  public createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Patch()
  public updateUserById(@Query('id') id: number, @Body() updateUserDto: CreateUserDto) {
    return this.userService.updateUser({ id }, updateUserDto);
  }

  @Patch()
  public updateUserByName(@Query('name') name: string, @Body() updateUserDto: CreateUserDto) {
    return this.userService.updateUser({ name }, updateUserDto);
  }

  @Patch()
  public updateUserByEmail(@Query('email') email: string, @Body() updateUserDto: CreateUserDto) {
    return this.userService.updateUser({ email }, updateUserDto);
  }

  @Delete()
  public deleteUserById(@Query('id') id: number) {
    return this.userService.deleteUser({ id });
  }

  @Delete()
  public deleteUserByName(@Query('name') name: string) {
    return this.userService.deleteUser({ name });
  }

  @Delete()
  public deleteUserByEmail(@Query('email') email: string) {
    return this.userService.deleteUser({ email });
  }
}
