import { Module } from '@nestjs/common';
import { AuthMiddleware } from 'src/LPH.auth.middleware';
import { RolesGuard } from 'src/LPH.roles.guard';

@Module( {
  imports: [/* ... */],
  providers: [AuthMiddleware, RolesGuard],
} )
export class AuthModule { }
