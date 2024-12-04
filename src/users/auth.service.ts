import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";


const scrypt = promisify(_scrypt)

@Injectable()
export class AuthService  {
 constructor(private usersServices: UsersService) {
    
 }

 async signup(email: string, password: string) {
    const users = await this.usersServices.find(email);
    if (users.length ) {
        throw new BadRequestException("Email is in use!")
    }

    // hash the password
    // make salt
    const salt = randomBytes(8).toString('hex')

    // has salt + pass
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // join hased and salt
    const result = salt + '.' + hash.toString('hex')

    const user = await this.usersServices.create(email, result)

    return user; 
 }

 async signin(email: string, password: string) {
    const [user] = await this.usersServices.find(email);

    if (!user) {
        throw new NotFoundException("No user found. Sign up instead")
    }

    // slpit salt and hash
    const [salt, storedHashed] = user.password.split('.');

    const newHased = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHashed !== newHased.toString('hex')) {
        throw new BadRequestException("Bad password")
    }

    return user;
 }
}