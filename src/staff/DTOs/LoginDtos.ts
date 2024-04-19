import { ApiProperty } from '@nestjs/swagger';

export class LoginStaffDTO {
  @ApiProperty( { description: 'generated Staff Username' } )
  username: string;
  @ApiProperty( { description: 'staff password' } )
  password: string;
}
