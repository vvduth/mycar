import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
@Module({
  controllers: [UsersController],
  providers: [UsersService, AuthService, CurrentUserInterceptor],
  imports: [
    TypeOrmModule.forFeature([User])
  ]
})
export class UsersModule {}
