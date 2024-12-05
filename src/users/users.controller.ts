import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Query,
  Delete,
  UseGuards,
  Session,
} from '@nestjs/common';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from '../guards/auth.guard';
@Controller('auth')
@Serialize(UserDto)

export class UsersController {
  constructor(
    private userService: UsersService,
    private authSerive: AuthService,
  ) {}

  @Get('/whoami')
  @UseGuards(AuthGuard)
  whoamI(@CurrentUser() user: User) {
    return user
  }

  @Post('/signout')
  async signout(@Session() session: any) {
    session.userId = null;
  }
  @Post('/signup')
  async createUser(@Body() body: CreateUserDTO, @Session() session: any) {
    const user = await this.authSerive.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDTO, @Session() session: any) {
    const user = await this.authSerive.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Get('/:id')
  getUser(@Param('id') id: string) {
    console.log('handler is running');
    return this.userService.findOne(parseInt(id));
  }

  @Get()
  findAllUser(@Query('email') email: string) {
    return this.userService.find(email);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.userService.remove(parseInt(id));
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDTO) {
    return this.userService.update(parseInt(id), body);
  }
}
1;
