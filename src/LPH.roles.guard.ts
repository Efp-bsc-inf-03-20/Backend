import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { LPHStaffRole } from 'src/auth/roles.enum';
import { ROLES_KEY } from './roles.decorator';
import { User } from './Entitys/User.staff.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor( private readonly reflector: Reflector ) { }

  canActivate( context: ExecutionContext ): boolean {
    console.log( 'RolesGuard: Starting authorization process' );

    const requiredRoles = this.reflector.get<LPHStaffRole[]>( ROLES_KEY, context.getHandler() );

    if ( !requiredRoles || requiredRoles.length === 0 ) {
      return true;
    }

    const user: User = this.getUser( context );
    console.log( user );
    if ( !user || !user.roles ) {
      throw new UnauthorizedException( 'User is not logged in or has no roles' );
    }


    try {
      if ( user.roles.includes( LPHStaffRole.ADMIN ) ) {
        return true;
      } else if ( user.roles.includes( LPHStaffRole.MANAGER ) ) {
        return this.hasAllRequiredRoles( requiredRoles, LPHStaffRole.MANAGER );
      } else if ( user.roles.includes( LPHStaffRole.DOCTOR ) ) {
        if ( this.isRestrictedEndpoint( context ) ) {
          throw new ForbiddenException( 'Access denied for doctors to this endpoint' );
        }
        return this.hasAnyRequiredRole( requiredRoles, LPHStaffRole.DOCTOR );
      } else {
        throw new ForbiddenException( 'User role is not authorized for this action' );
      }
    } catch ( error ) {
      throw error; // Re-throw the error for appropriate handling
    }
  }

  private getUser( context: ExecutionContext ) {
    return context.switchToHttp().getRequest().user;
  }

  private isRestrictedEndpoint( context: ExecutionContext ): boolean {
    const requestedEndpoint = context.switchToHttp().getRequest().url;
    const restrictedEndpoints = [
      '/count-all-staff',
      '/register-staff',
      '/delete-staff/:id',
      '/update-staff/:id',
      '/view-staff/:id',
      '/view-all-staff',
    ];
    return restrictedEndpoints.includes( requestedEndpoint );
  }

  private hasAllRequiredRoles( requiredRoles: LPHStaffRole[], ...allowedRoles: LPHStaffRole[] ): boolean {
    return requiredRoles.every( ( role ) => allowedRoles.includes( role ) );
  }

  private hasAnyRequiredRole( requiredRoles: LPHStaffRole[], ...allowedRoles: LPHStaffRole[] ): boolean {
    return requiredRoles.some( ( role ) => allowedRoles.includes( role ) );
  }
}

