import { Body, Controller,Post, Get, Patch, Param, Query, Delete ,
    UseInterceptors, ClassSerializerInterceptor
} from '@nestjs/common';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDTO } from './dtos/update-user.dto';

@Controller('auth')
export class UsersController {

    constructor (private userService: UsersService) {}
    @Post('/signup')
    createUser(@Body() body: CreateUserDTO) {
        this.userService.create(body.email, body.password);
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/:id')
    getUser(@Param('id') id: string){
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