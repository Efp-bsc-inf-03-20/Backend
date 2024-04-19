export type createStaffParams = {
  FirstName: string;
  LastName: string;
  DateOfBirth: Date;
  PhoneNumber: string;
  Email: string;
  Password: string;
  Roles: string[];
}
export class UpdateStaffParams {
  id?: number;
  FirstName: string;
  LastName: string;
  DateOfBirth?: Date;
  PhoneNumber: string;
  Email: string;
  Password: string;
  Roles: string[];
}
