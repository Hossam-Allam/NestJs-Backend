import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';

@Module({
  imports: [ //handles database connection, could have used environment variables but for the scale of this project I felt that it isnt needed
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'myuser',
      password: '1234',
      database: 'test',
      entities: [User],
      synchronize: true,
    }),
    MailerModule.forRoot({ //handles sending the verification email
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'testbeije@gmail.com',
          pass: 'bfkwupwmrxjvvnsi',
        },
      },
      defaults: {
        from: '"No Reply" <no-reply@example.com>',
      },
      template: {
        dir: join(__dirname, '..', 'src', 'templates'),  //the email template
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    UserModule,
  ],
})
export class AppModule {}


