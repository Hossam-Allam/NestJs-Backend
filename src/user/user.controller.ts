import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user') //defining the route 
export class UserController {
    constructor(private readonly userService: UserService) {} //dependancy injection :D

    @Post('register')
    async register(@Body() body: { username: string, email: string }): Promise<User> { //username and email are passed in as json objects in the body
        //calling the register function in userService to hande registration
        return this.userService.register(body.username, body.email);
    }

    @Get('verify-email/:username/:verificationToken')
    async verifyEmail(
        @Param('username') username: string,
        @Param('verificationToken') verificationToken: string
    ): Promise<{ message: string }> {
        await this.userService.verifyEmail(username, verificationToken); //calling the verifyEmail function...
        return { message: 'Email verified successfully' };
    }

    @Get('check-verification/:username')
    async checkVerification(@Param('username') username: string): Promise<{ message: string }> {
        const isVerified = await this.userService.checkVerification(username); //calling the check verification function...
        if (isVerified) {
            return { message: 'User is verified' };
        } else {
            return { message: 'User is not verified' };
        }
    }
    
}

