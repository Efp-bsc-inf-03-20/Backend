import { AfterInsert, AfterUpdate, Column, Entity, PrimaryGeneratedColumn, getRepository } from "typeorm";
import { IsNotEmpty, IsString, IsNumber, IsDate, IsPositive } from 'class-validator';

@Entity()
export class Financial {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({ nullable: false })
  @IsNotEmpty({ message: 'First Name should not be empty' })
  @IsString({ message: 'First Name should be a string' })
  FirstName: string;

  @Column({ nullable: false })
  @IsNotEmpty({ message: 'Last Name should not be empty' })
  @IsString({ message: 'Last Name should be a string' })
  LastName: string;

  @Column({ nullable: false })
  @IsNotEmpty({ message: 'Treatment should not be empty' })
  @IsString({ message: 'Treatment should be a string' })
  Treatment: string;

  @Column({ nullable: false })
  @IsNotEmpty({ message: 'Amount should not be empty' })
  @IsNumber({}, { message: 'Amount should be a number' })
  @IsPositive({ message: 'Amount should be a positive number' })
  Amount: number;

  @Column()
  @IsString({ message: 'Payment Method should be a string' })
  PaymentMethod: string;

  @Column()
  @IsDate({ message: 'Date should be a valid date' })
  Date: Date;

 // @Column({ default: 0 }) // Default DayTotal to 0
  //DayTotal: number;

  
}








@Entity()
export class DaySummary {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty({ message: 'Day Total should not be empty' })
  @IsNumber({}, { message: 'Day Total should be a number' })
  @IsPositive({ message: 'Day Total should be a positive number' })
  DayTotal: number;

  @Column()
  @IsNotEmpty({ message: 'Expenditure should not be empty' })
  @IsNumber({}, { message: 'Expenditure should be a number' })
  @IsPositive({ message: 'Expenditure should be a positive number' })
  Expenditure: number;

  @Column()
  @IsNotEmpty({ message: 'Banking should not be empty' })
  @IsNumber({}, { message: 'Banking should be a number' })
  @IsPositive({ message: 'Banking should be a positive number' })
  Banking: number;

  @Column()
  @IsNotEmpty({ message: 'CashInHand should not be empty' })
  @IsNumber({}, { message: 'CashInHand should be a number' })
  @IsPositive({ message: 'CashInHand should be a positive number' })
  CashInHand: number;

  @Column()
  @IsDate({ message: 'Date should be a valid date' })
  Date: Date;

}
