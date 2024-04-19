import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsString, IsNumber, IsEmail } from 'class-validator';

@Entity( { name: 'users' } )
export class User {
  @PrimaryGeneratedColumn( )
  id!: number;

  @Column( { type: 'text', nullable: false } )
  @IsString( { message: 'First name must be a string' } )
  @IsNotEmpty( { message: 'First name can not be empty' } )
  firstName: string;

  @Column( { type: 'text', nullable: false } )
  @IsNotEmpty( { message: 'Last name can not be empty' } )
  lastName: string;

  @Column( { type: 'text', nullable: false, unique: true } )
  username: string;

  @Column( { type: 'text', nullable: false } )
  dateOfBirth: Date;

  @Column( { type: 'text', nullable: false } )
  @IsNumber()
  @IsNotEmpty( { message: 'Phone number can not be empty' } )
  phoneNumber: string;

  @Column( { nullable: false, unique: true } )
  @IsNotEmpty( { message: 'Email can not be empty' } )
  @IsEmail( {}, { message: 'Invalid email format' } )
  email: string;

  @Column( { nullable: false } )
  @IsString( { message: 'Password must be a string' } )
  @IsNotEmpty( { message: 'Password can not be empty' } )
  password: string;

  @Column( { type: 'simple-array', default: [] } )
  roles: string[];

  @CreateDateColumn()
  createdAt: Date;
}
