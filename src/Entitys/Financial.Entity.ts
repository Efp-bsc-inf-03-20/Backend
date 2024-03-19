import { AfterInsert, AfterUpdate, Column, Entity, PrimaryGeneratedColumn, getRepository } from "typeorm";
import { IsNotEmpty, IsString, IsNumber, IsDate, IsPositive } from 'class-validator';

@Entity()
export class Financial {
  @PrimaryGeneratedColumn()
  id: number;

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

  // Static method to get the repository for the Financial entity
  static getRepository() {
    return getRepository(Financial);
  }
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
  Expinditure: number;

  @Column()
  @IsNotEmpty({ message: 'Banking should not be empty' })
  @IsNumber({}, { message: 'Banking should be a number' })
  @IsPositive({ message: 'Banking should be a positive number' })
  Banking: number;

  @Column()
  @IsNotEmpty({ message: 'cashinhand should not be empty' })
  @IsNumber({}, { message: 'cashinhand should be a number' })
  @IsPositive({ message: 'cashinhand should be a positive number' })
  CashInHand: number;

  @Column()
  @IsDate({ message: 'Date should be a valid date' })
  Date: Date;

  // Hook to recalculate DayTotal and Expinditure after Financial entity is inserted or updated
  @AfterInsert()
  @AfterUpdate()
  async recalculateValues() {
    try {
      const result = await Financial.getRepository()
        .createQueryBuilder('financial')
        .select('SUM(financial.Amount)', 'totalAmount')
        
        .getRawOne();

      const totalAmount = result.totalAmount || 0;
      this.DayTotal = totalAmount;
      this.Expinditure = this.DayTotal - this.CashInHand;
    } catch (error) {
      console.error('Error calculating DayTotal and Expinditure:', error);
    }
  }
}
