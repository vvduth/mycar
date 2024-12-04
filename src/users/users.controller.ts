import { Body, Controller,Post, Get, Patch, Param, Query, Delete ,
    UseInterceptors, 
} from '@nestjs/common';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { Serialize, SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {

    constructor (private userService: UsersService) {}
    @Post('/signup')
    createUser(@Body() body: CreateUserDTO) {
        this.userService.create(body.email, body.password);
    }

   
    @Get('/:id')
    getUser(@Param('id') id: string){
        console.log("handler is running")
        return this.userService.findOne(parseInt(id))
    }

    @Get()
    findAllUser(@Query('email') email: string ) {
        return this.userService.find(email)
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string) {
        return this.userService.remove(parseInt(id))
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDTO ) {
        return this.userService.update(parseInt(id), body)
    }
}
1