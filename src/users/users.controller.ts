import { Body, Controller,Post, Get, Patch, Param, Query, Delete } from '@nestjs/common';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {

    constructor (private userService: UsersService) {}
    @Post('/signup')
    createUser(@Body() body: CreateUserDTO) {
        this.userService.create(body.email, body.password);
    }

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
}
1