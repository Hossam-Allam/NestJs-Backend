import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { randomBytes } from 'crypto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>, //database operations
        private readonly mailerService: MailerService, //sending the verification email
    ) {}

    async register(username: string, email: string): Promise<User> {
        const verificationToken = randomBytes(32).toString('hex'); //generating a random token
        const user = this.userRepository.create({ name: username, email, verificationToken }); 
        await this.userRepository.save(user); //handles saving the row to the database table

        //handles sending the email
        await this.mailerService.sendMail({
            to: email,
            subject: 'Verify Email Address',
            template: './verification',
            context: { //variables that are used in the email
                username,
                verificationToken,
            },
        });

        return user; 
    }

    async verifyEmail(username: string, verificationToken: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { name: username } }); //finding a user whith a matching name
        if (!user) { //if no user is found
            throw new NotFoundException('User not found');
        }
        //debugging purposes
        console.log(`Stored token: ${user.verificationToken}`);
        console.log(`Provided token: ${verificationToken}`);

        if (user.verificationToken !== verificationToken) { //if the verification token doesnt match we get a 400 bad request
            throw new BadRequestException('Verification token is incorrect');
        }

        user.isVerified = true; //else we set the field to true and save
        await this.userRepository.save(user);

        return user;
    }

    async checkVerification(username: string): Promise<boolean> {
        const user = await this.userRepository.findOne({ where: { name: username } }); //look for the user with the matching name
        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user.isVerified; //return the isVerified field, which will be true or false
    }
}

