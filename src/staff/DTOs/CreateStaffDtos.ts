import { ApiProperty } from '@nestjs/swagger';
import { PrimaryGeneratedColumn } from 'typeorm';

export class CreateStaffDTO {

  @PrimaryGeneratedColumn( )
  id!: number;
  @ApiProperty({ description: 'First name of the person' })
  firstName: string;
  @ApiProperty({ description: 'Last name of the person' })
  lastName: string;
  @ApiProperty( { description: 'Date of birth' } )
  dateOfBirth: Date;
  @ApiProperty({ description: 'Phone number of the person' })
  phoneNumber: string;
  @ApiProperty({ description: 'staff email' })
  email: string;
  @ApiProperty( { description: 'staff password' } )
  password: string;
  @ApiProperty( { description: 'staff roles' } )
  roles: string[];
}
