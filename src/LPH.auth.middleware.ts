import { Request, Response, NextFunction } from 'express';
import { UnauthorizedException, ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';

import { LPHStaffRole } from './auth/roles.enum';
import { verify } from 'jsonwebtoken';
import { StaffService } from './staff/staff.service';
import { User } from './Entitys/User.staff.entity';

// Custom interface extending the Request interface to include the 'user' property
interface CustomRequest extends Request {
  user?: User; // Assuming User is the type of your entity
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor( private readonly staffService: StaffService ) { }

  async use( req: CustomRequest, res: Response, next: NextFunction ) {
    try {

      const accessToken = req.cookies['accessToken'];

      if ( !accessToken ) {
        throw new UnauthorizedException( 'Access token is missing' );
      }

      const payload: any = verify( accessToken, 'access_secret' );

      if ( !payload ) {
        throw new UnauthorizedException( 'Invalid access token' );
      }
      const user = await this.staffService.findStaffById( payload.id );

      if ( !user ) {
        throw new UnauthorizedException( 'User not found' );
      }

      req.user = user;

      console.log( req.user );
      const loggedInUser = user;

      if ( !loggedInUser.roles.includes( LPHStaffRole.ADMIN ) ) {
        throw new ForbiddenException( 'User does not have permission to access this resource' );
      }

      next();
    } catch ( error ) {
      console.error( 'AuthMiddleware: Authentication error:', error.message );
      next( error );
    }
  }
}
