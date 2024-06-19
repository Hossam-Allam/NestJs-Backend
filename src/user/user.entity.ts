import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User { //our user entity that will be in the database


  @PrimaryGeneratedColumn() //primary key
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  verificationToken: string;

  @Column({default: false}) //when the user signs up he/she would be set to unverified until they check the verification link
  isVerified: boolean;

}
