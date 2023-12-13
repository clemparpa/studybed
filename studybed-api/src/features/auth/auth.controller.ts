import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { LocalAuthGuard } from './guards/auth-local.guard';
import { AuthService } from './auth.service';
import { UserDto } from '../users/dto/user.dto';
import { PublicRoute } from './auth.decorators';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @PublicRoute()
  @Post('login')
  async login(@Request() { user }: { user: UserDto }) {
    return this.authService.login(user);
  }

  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
