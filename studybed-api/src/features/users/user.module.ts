import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './data-access/user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
