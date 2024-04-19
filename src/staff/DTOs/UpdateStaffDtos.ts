import { ApiProperty } from '@nestjs/swagger';

export class UpdateStaffDTO {
  @ApiProperty( { description: "id of the staff to update" } )
  id!: number;
  @ApiProperty( { description: 'First name of the person' } )
  firstName: string;
  @ApiProperty( { description: 'Last name of the person' } )
  lastName: string;
  @ApiProperty( { description: 'generated Staff Username' } )
  username: string;
  @ApiProperty( { description: 'Date of birth' } )
  dateOfBirth: Date;
  @ApiProperty( { description: 'Phone number of the person' } )
  phoneNumber: string;
  @ApiProperty( { description: 'staff email' } )
  email: string;
  @ApiProperty( { description: 'staff password' } )
  password: string;
  @ApiProperty( { description: 'staff roles' } )
  roles: string[];
  @ApiProperty( { description: 'Date staff created' } )
  createdAt: Date;
}
