import { SetMetadata } from '@nestjs/common';
import { LPHStaffRole } from './auth/roles.enum';

export const ROLES_KEY = 'roles'; // Define the constant for clarity

export const Roles = ( ...roles: LPHStaffRole[] ) => SetMetadata( ROLES_KEY, roles );
